import { Body, Controller, Get, Param, Post, Query, UseInterceptors } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor'
import { AppLoggerService } from 'src/common/modules/app-logger/app-logger.service'
import { IPaymentsByStatus } from './dashboard/payments-by-status.interface'
import { IPaymentsByType } from './dashboard/payments-by-type.interface'
import { readPaymentDto } from './dashboard/payments-list.dto'
import { IPeriodSummaryStats, ISummaryStats } from './dashboard/summary-stats.interface'
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
  @Get('dashboard/payments/:time_ago')
  async getSummaryStats(@Param('time_ago') timeAgo: string): Promise<ISummaryStats> {
    if (timeAgo.indexOf('-')) {
      const timeQuantity = Number(timeAgo.split('-')[0])
      const timeType = timeAgo.split('-')[1].toLowerCase()
      const { currentMinDate, prevMinDate } = {
        ...this.getCurrentAndPrevMinDates(timeType, timeQuantity),
      }
      const prevSummaryStats = await this.getPeriodSummaryStats(prevMinDate, currentMinDate)
      const currentSummaryStats = await this.getPeriodSummaryStats(currentMinDate)
      const summaryStats: ISummaryStats = {
        prev: prevSummaryStats,
        current: currentSummaryStats,
      }
      return summaryStats
    }
    console.log('not correct day/month/year format')
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
    initDate: Date,
    finishDate?: Date,
  ): Promise<IPeriodSummaryStats> {
    const summaryStatsRaw = await this.paymentService.getSummaryStats(initDate, finishDate)
    const summaryStatsByTime = await this.paymentService.getSummaryStatsHour(initDate, finishDate)
    const init_time = initDate
    const finish_time = finishDate || new Date()
    const summaryStats: IPeriodSummaryStats = { ...summaryStatsRaw, init_time, finish_time }
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
        currentMinDate.setDate(currentMinDate.getDate() - timeQuantity)
        prevMinDate.setDate(prevMinDate.getDate() - timeQuantity * 2)
        break
      }
    }
    return { currentMinDate: currentMinDate, prevMinDate: prevMinDate }
  }
}

interface IMinDates {
  currentMinDate: Date
  prevMinDate: Date
}
