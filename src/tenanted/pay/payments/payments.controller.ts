import { Body, Controller, Get, Param, Post, Query, UseInterceptors } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor'
import { AppLoggerService } from 'src/common/modules/app-logger/app-logger.service'
import { TimeRange } from '../constants'
import { IPaymentsByStatus } from './dashboard/payments-by-status.interface'
import { IPaymentsByType } from './dashboard/payments-by-type.interface'
import { readPaymentDto } from './dashboard/payments-list.dto'
import {
  IPeriodSummaryStats,
  IStatsByTime,
  ISummaryStats,
} from './dashboard/summary-stats.interface'
import { PayMPItem } from './database/pay-mp-item.entity'
import { IMPPaymentStatus } from './dto/interfaces/pay-mp-payment-status.interface'
import { MPCreateLinkDto } from './dto/mp-create-link.dto'
import { PayConfigurationResp } from './dto/pay-config-resp.interface'
import { PayConfigurationReadDto } from './dto/pay-configuration-read.dto'
import { PayFormReq } from './dto/pay-form-req.dto'
import { IPayMPPayment } from './dto/pay-mp-payment.dto'
import { SubmittedFormDto } from './dto/submittedForm.dto'
import { PaymentsService } from './payments.service'

@UseInterceptors(LoggingInterceptor)
@Controller('tenant/pay')
export class PaymentsController {
  private readonly appLogger = new AppLoggerService(PaymentsController.name)
  constructor(private paymentService: PaymentsService) {}

  @Get()
  async getFormConfig(@Query('item_id') item_id?: string): Promise<PayConfigurationResp> {
    let mpItem = null
    const rawPayForm = await this.paymentService.getPayConfiguration()
    const payForm = plainToClass(PayConfigurationReadDto, rawPayForm)
    if (item_id) mpItem = await this.paymentService.getMPItem(Number(item_id))
    return {
      pay_form: payForm,
      item: mpItem,
    }
  }

  @Post('mercadopago')
  async sendMPPayment(@Body() submittedForm: SubmittedFormDto): Promise<string> {
    try {
      const mpResponse = await this.paymentService.createMPCall(submittedForm)
      if (mpResponse) {
        this.appLogger.info(
          this.sendMPPayment.name,
          'payment submitted: ' + submittedForm.additional_info,
        )
        return mpResponse?.init_point || mpResponse
      }
    } catch (err) {
      return err
    }
  }

  @Post('create-link')
  async createLink(@Body() createLink: MPCreateLinkDto): Promise<PayMPItem> {
    try {
      return await this.paymentService.createMPLink(createLink)
    } catch (err) {
      return err
    }
  }

  @Post('ipn')
  async mercadopagoIPN(
    @Query('data.id') data_id: string,
    @Query('type') type: string,
  ): Promise<any> {
    const basicMPPayment: IPayMPPayment = {
      mp_id: data_id,
      operation_type: type,
    }
    const createdMPPayment = await this.paymentService.createMPPayment(basicMPPayment)
    try {
      const mpPaymentStatus = await this.getMPPaymentStatus(data_id)
      await this.paymentService.updateMPPayment(createdMPPayment.id, mpPaymentStatus)
      if (mpPaymentStatus) {
        this.appLogger.info(this.mercadopagoIPN.name, 'IPN processed for : ' + data_id)
      }
    } catch (err) {
      console.log(err)
    }
  }

  @Get('payment_status/:payment_id')
  async getMPPaymentStatus(@Param('payment_id') paymentId: string): Promise<IMPPaymentStatus> {
    if (paymentId) {
      try {
        return await this.paymentService.getMPPaymentStatus(paymentId)
      } catch (err) {
        console.log(err)
      }
    }
  }

  // -------------------------- DASHBOARD -------------------------- //
  @Get('dashboard/payments')
  async getSummaryStats(
    @Query('group_type') groupType: string,
    @Query('prev_init_date') rawPrevInitDate: string,
    @Query('init_date') rawInitDate: string,
    @Query('finish_date') rawFinishDate?: string,
  ): Promise<ISummaryStats> {
    const prevInitDate = new Date(rawPrevInitDate)
    const initDate = new Date(rawInitDate)
    const finishDate = new Date(rawFinishDate)
    const prevSummaryStats = await this.getPeriodSummaryStats(groupType, prevInitDate, initDate)
    const currentSummaryStats = await this.getPeriodSummaryStats(groupType, initDate, finishDate)
    const summaryStats: ISummaryStats = {
      prev: prevSummaryStats,
      current: currentSummaryStats,
    }
    return summaryStats
  }

  @Get('dashboard/paymentlist/:time_ago')
  async getPaymentList(@Param('time_ago') timeAgo: string): Promise<readPaymentDto[]> {
    const paymentList: readPaymentDto[] = []
    if (timeAgo.indexOf('-')) {
      const timeQuantity = Number(timeAgo.split('-')[0])
      const timeType = timeAgo.split('-')[1].toLowerCase()
      const initDate = this.getCurrentAndPrevMinDates(timeType, timeQuantity).currentMinDate
      const rawPaymentList = await this.paymentService.getPaymentList(initDate)
      rawPaymentList.forEach((payment) => {
        const readPayment = new readPaymentDto(payment)
        paymentList.push(readPayment)
      })
      return paymentList
    }
    console.log('not correct day/month/year format')
  }

  @Get('dashboard/by_type/:time_ago')
  async paymentsByMethod(@Param('time_ago') timeAgo: string): Promise<IPaymentsByType[]> {
    if (timeAgo.indexOf('-')) {
      const timeQuantity = Number(timeAgo.split('-')[0])
      const timeType = timeAgo.split('-')[1].toLowerCase()
      const initDate = this.getCurrentAndPrevMinDates(timeType, timeQuantity).currentMinDate
      const paymentList = await this.paymentService.getPaymentByType(initDate)
      return paymentList
    }
    console.log('not correct day/month/year format')
  }

  @Get('dashboard/by_status/:time_ago')
  async paymentsByStatus(@Param('time_ago') timeAgo: string): Promise<IPaymentsByStatus[]> {
    if (timeAgo.indexOf('-')) {
      const timeQuantity = Number(timeAgo.split('-')[0])
      const timeType = timeAgo.split('-')[1].toLowerCase()
      const initDate = this.getCurrentAndPrevMinDates(timeType, timeQuantity).currentMinDate
      const paymentList = await this.paymentService.getPaymentByStatus(initDate)
      return paymentList
    }
    console.log('not correct day/month/year format')
  }

  // -------------------------- FORM -------------------------- //
  @Post('form')
  async updateForm(@Body() form: PayFormReq): Promise<void> {
    if (form) {
      try {
        await this.paymentService.saveConfiguration(form)
      } catch (err) {
        throw err
      }
    }
  }

  // ******************************* PRIVATE FUNCTIONS ********************************
  private async getPeriodSummaryStats(
    groupType: string,
    initDate: Date,
    finishDate?: Date,
  ): Promise<IPeriodSummaryStats> {
    const summaryStatsRaw = await this.paymentService.getSummaryStats(initDate, finishDate)
    const summaryStatsByTime = await this.getSummaryStatsGroupByPeriod(
      groupType,
      initDate,
      finishDate,
    )
    const summaryStats: IPeriodSummaryStats = { ...summaryStatsRaw }
    summaryStats.stats_by_time = summaryStatsByTime
    return summaryStats
  }

  private getCurrentAndPrevMinDates(timeType: string, timeQuantity: number): IMinDates {
    const currentMinDate = new Date()
    const prevMinDate = new Date()
    switch (timeType) {
      case 'm': {
        currentMinDate.setMonth(currentMinDate.getMonth() - timeQuantity)
        prevMinDate.setMonth(prevMinDate.getMonth() - timeQuantity * 2)
        break
      }
      case 'y': {
        currentMinDate.setFullYear(currentMinDate.getFullYear() - timeQuantity)
        prevMinDate.setFullYear(prevMinDate.getFullYear() - timeQuantity * 2)
        break
      }
      default: {
        // const dd = new Date()
        // console.log(dd)
        // const difftz = dd.getTimezoneOffset()

        // dd.setHours(0,0,0,0)
        // dd.setMinutes(dd.getMinutes() - difftz)
        // console.log(dd)

        // const ddf = new Date()
        // ddf.setHours(23,59,59,0)
        // ddf.setMinutes(ddf.getMinutes() - difftz)
        // console.log(ddf)
        currentMinDate.setDate(currentMinDate.getDate() - (timeQuantity - 1))
        // currentMinDate.setHours(0, 0, 0, 0)
        prevMinDate.setDate(prevMinDate.getDate() - (timeQuantity * 2 - 1))
        // prevMinDate.setHours(0, 0, 0, 0)
        break
      }
    }
    return { currentMinDate: currentMinDate, prevMinDate: prevMinDate }
  }

  private async getSummaryStatsGroupByPeriod(
    groupType: string,
    initDate: Date,
    finishDate?: Date,
  ): Promise<IStatsByTime[]> {
    switch (groupType.toLowerCase()) {
      case TimeRange.MONTH: {
        // return await this.paymentService.getSummaryStatsByMonth(initDate, finishDate)
      }
      case TimeRange.WEEK: {
        return await this.paymentService.getSummaryStatsByWeek(initDate, finishDate)
      }
      case TimeRange.DAY: {
        const statsByDay = await this.paymentService.getSummaryStatsByDay(initDate, finishDate)
        return this.fillMissedLogsByDay(statsByDay, initDate, finishDate)
      }
      case TimeRange.HOUR: {
        const statsByHour = await this.paymentService.getSummaryStatsByHour(initDate, finishDate)
        return this.fillMissedLogsByHour(statsByHour)
      }
    }
  }

  private fillMissedLogsByDay(
    statsByDay: IStatsByTime[],
    initDate: Date,
    finishDate: Date,
  ): IStatsByTime[] {
    console.log(typeof initDate)
    initDate.setDate(initDate.getDate() + 1)
    const filledStatsByDay = []
    const mappedLogs = new Map<string, IStatsByTime>()
    statsByDay.map((el) => {
      mappedLogs.set(new Date(el.time).toISOString().split('T')[0], el)
      // mappedLogs.set(el.time, el)
    })
    mappedLogs.forEach((el) => console.log(el))
    for (let day = initDate; day <= finishDate; day.setDate(day.getDate() + 1)) {
      const dayFormatted = day.toISOString().split('T')[0]
      if (mappedLogs.get(dayFormatted)) {
        filledStatsByDay.push(mappedLogs.get(dayFormatted))
      } else {
        const emptyHour: IStatsByTime = {
          time: day.toISOString(),
          sell_quantity: 0,
          sells: 0,
          ticket_avg: 0,
        }
        filledStatsByDay.push(emptyHour)
      }
    }
    return filledStatsByDay
  }

  private fillMissedLogsByHour(statsByDay: IStatsByTime[]): IStatsByTime[] {
    const filledStatsByHour: IStatsByTime[] = []
    const mappedLogs = new Map<string, IStatsByTime>()
    statsByDay.map((el) => {
      const date = new Date(el.time)
      el.time = date.getHours().toString()
      mappedLogs.set(el.time, el)
    })
    for (let hour = 0; hour < 24; hour++) {
      if (mappedLogs.get(hour.toString())) {
        filledStatsByHour.push(mappedLogs.get(hour.toString()))
      } else {
        const emptyHour: IStatsByTime = {
          time: hour.toString(),
          sell_quantity: 0,
          sells: 0,
          ticket_avg: 0,
        }
        filledStatsByHour.push(emptyHour)
      }
    }
    return filledStatsByHour
  }
}

interface IMinDates {
  currentMinDate: Date
  prevMinDate: Date
}
