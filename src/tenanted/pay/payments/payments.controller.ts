import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor'
import { AppLoggerService } from 'src/common/modules/app-logger/app-logger.service'
import { JwtAuthGuard } from 'src/common/modules/auth/guards/jwt-auth.guard'
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
  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Get('dashboard/paymentlist')
  async getPaymentList(
    @Query('init_date') rawInitDate: string,
    @Query('finish_date') rawFinishDate?: string,
  ): Promise<readPaymentDto[]> {
    const paymentList: readPaymentDto[] = []
    const initDate = new Date(rawInitDate)
    const finishDate = rawFinishDate ? new Date(rawFinishDate) : null
    const rawPaymentList = await this.paymentService.getPaymentList(initDate, finishDate)
    rawPaymentList.forEach((payment) => {
      const readPayment = new readPaymentDto(payment)
      paymentList.push(readPayment)
    })
    return paymentList
  }

  @UseGuards(JwtAuthGuard)
  @Get('dashboard/by_type')
  async paymentsByMethod(
    @Query('init_date') rawInitDate: string,
    @Query('finish_date') rawFinishDate?: string,
  ): Promise<IPaymentsByType[]> {
    const initDate = new Date(rawInitDate)
    const finishDate = rawFinishDate ? new Date(rawFinishDate) : null
    const paymentList = await this.paymentService.getPaymentByType(initDate, finishDate)
    return paymentList
  }

  @UseGuards(JwtAuthGuard)
  @Get('dashboard/by_status')
  async paymentsByStatus(
    @Query('init_date') rawInitDate: string,
    @Query('finish_date') rawFinishDate?: string,
  ): Promise<IPaymentsByStatus[]> {
    const initDate = new Date(rawInitDate)
    const finishDate = rawFinishDate ? new Date(rawFinishDate) : null
    const paymentList = await this.paymentService.getPaymentByStatus(initDate, finishDate)
    return paymentList
  }

  // -------------------------- FORM -------------------------- //
  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Get('form')
  async getForm(): Promise<PayConfigurationReadDto> {
    try {
      const rawPayForm = await this.paymentService.getPayConfiguration()
      const payForm = plainToClass(PayConfigurationReadDto, rawPayForm)
      return payForm
    } catch (err) {
      throw err
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
        return await this.paymentService.getSummaryStatsByDay(initDate, finishDate)
      }
      case TimeRange.HOUR: {
        const statsByHour = await this.paymentService.getSummaryStatsByHour(initDate, finishDate)
        return this.fillMissedLogsByHour(statsByHour)
      }
    }
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
