import { Inject, Injectable } from '@nestjs/common'
import { TENANCY_CONNECTION } from 'src/public/tenancy/tenancy.provider'
import { MPPaymentsService } from 'src/third-party-apis/Mercado-pago/payments/mp-payments.service'
import { toAddressFormat, toPhoneFormat } from 'src/utils/utils'
import { Repository, Connection } from 'typeorm'
import { PayConfiguration } from './database/pay-configuration.entity'
import { IPayMPCallLog, PayMPCallLogs } from './database/pay-mp-call-logs.entity'
import { PayMPItem } from './database/pay-mp-item.entity'
import { IMPPaymentStatus } from './dto/interfaces/pay-mp-payment-status.interface'
import { PayMPPayment } from './database/pay-mp-payment.entity'
import { DEFAULT_PREFERENCE, PayMPPreference } from './database/pay-mp-preference.entity'
import { IMPPreference } from './dto/interfaces/mp-preference.interface'
import { IPayMPPayment, toMPPayment } from './dto/pay-mp-payment.dto'
import { SubmittedFormDto } from './dto/submittedForm.dto'
import { MPCreateLinkDto } from './dto/mp-create-link.dto'
import { IDBStats, IStatsByTime } from './dashboard/summary-stats.interface'
import { PayFormReq } from './dto/pay-form-req.dto'
import { IPaymentsByType } from './dashboard/payments-by-type.interface'
import { IPaymentsByStatus } from './dashboard/payments-by-status.interface'

@Injectable()
export class PaymentsService {
  private readonly mpPreferenceRepository: Repository<PayMPPreference>
  private readonly mpItemRepository: Repository<PayMPItem>
  private readonly payConfigurationRepository: Repository<PayConfiguration>
  private readonly payMPCallLogsRepository: Repository<PayMPCallLogs>
  private readonly payMPPaymentsRepository: Repository<PayMPPayment>

  constructor(
    private mpPaymentService: MPPaymentsService,
    @Inject(TENANCY_CONNECTION) connection: Connection,
  ) {
    this.mpPreferenceRepository = connection.getRepository(PayMPPreference)
    this.payConfigurationRepository = connection.getRepository(PayConfiguration)
    this.mpItemRepository = connection.getRepository(PayMPItem)
    this.payMPCallLogsRepository = connection.getRepository(PayMPCallLogs)
    this.payMPPaymentsRepository = connection.getRepository(PayMPPayment)
  }

  async createMPCall(submittedForm: SubmittedFormDto): Promise<any> {
    try {
      const defaultPreference = await this.getMPPreference(DEFAULT_PREFERENCE)
      const payConfiguration = await this.getPayConfiguration()
      const mpPreference = this.prepareToMP(submittedForm, defaultPreference)
      const mpSavedPreference = await this.saveMPCallLog(mpPreference)
      if (mpSavedPreference?.id) {
        mpPreference.external_reference = mpSavedPreference.id.toString()
        const payment = await this.mpPaymentService.createPayment(
          mpPreference,
          payConfiguration.mp_prod_access_token,
          // 'Bearer APP_USR-7422375236748514-071800-5cf4da2be6d0df61015acfaca7d26e21-1162617732', //test
        )
        if (payment) {
          await this.updateMPCallLog(mpSavedPreference.id, payment)
        }
        return payment
      }
      throw new Error('Error saving submitted payment')
    } catch (error) {
      return { error: true, msg: error + '. Failed to create payment' }
    }
  }

  async getMPPreference(code: string): Promise<PayMPPreference> {
    try {
      return await this.mpPreferenceRepository.findOne({ code: code })
    } catch (error) {
      return error
    }
  }

  async getMPItem(id: number): Promise<PayMPItem> {
    try {
      return await this.mpItemRepository.findOne({ id: id })
    } catch (error) {
      return error
    }
  }

  async getPayConfiguration(): Promise<PayConfiguration> {
    const payForm = await this.payConfigurationRepository.findOne()
    return payForm
  }

  async createMPLink(createLink: MPCreateLinkDto): Promise<PayMPItem> {
    try {
      return await this.mpItemRepository.save(createLink)
    } catch (err) {
      console.error(err)
      throw new Error('Error creating Mercado Pago Item')
    }
  }

  async createMPPayment(mpPayments: IPayMPPayment): Promise<IPayMPPayment> {
    try {
      return await this.payMPPaymentsRepository.save(mpPayments)
    } catch (err) {
      console.log(err.sqlMessage || 'error sql')
      return await this.payMPPaymentsRepository.findOne({ mp_id: mpPayments.mp_id })
    }
  }

  async updateMPPayment(mpPaymentId: number, paymentStatus: IMPPaymentStatus): Promise<void> {
    try {
      const mpPayment: IPayMPPayment = toMPPayment(paymentStatus)
      mpPayment.id = mpPaymentId
      await this.payMPPaymentsRepository.save(mpPayment)
    } catch (err) {
      console.error(err)
      throw new Error('Error parsing API response to Payment Entity OR duplicate payment ID')
    }
  }

  async getMPPaymentStatus(paymentId: string): Promise<IMPPaymentStatus> {
    try {
      const payConfiguration = await this.payConfigurationRepository.findOne()
      if (payConfiguration?.mp_prod_access_token) {
        try {
          // console.log('token in db: ' + payConfiguration.mp_prod_access_token.split(' ')[1])
          return await this.mpPaymentService.getPaymentStatus(
            paymentId,
            // 'APP_USR-7422375236748514-071800-5cf4da2be6d0df61015acfaca7d26e21-1162617732', //test
            payConfiguration.mp_prod_access_token.split(' ')[1],
          )
        } catch (err) {
          console.error(err)
          throw new Error('Error getting payment status from mercadopago')
        }
      }
      throw new Error('there is not an access token for client')
    } catch (err) {
      console.error(err)
    }
  }

  async saveMPCallLog(mpPreference: IMPPreference): Promise<IPayMPCallLog> {
    try {
      const mpCallLog: IPayMPCallLog = {
        payer_email: mpPreference.payer.email,
        payer_name: mpPreference.payer.name,
        payer_date_created: mpPreference.payer.date_created,
        payer_last_purchase: mpPreference.payer.last_purchase,
        payer_identification: mpPreference.payer.identification.number,
        payer_phone: toPhoneFormat(mpPreference.payer.phone),
        payer_address: toAddressFormat(mpPreference.payer.address),
        installments: mpPreference.installments,
        shipments_zip_code: mpPreference.shipment?.zip_code,
        shipments_street_name: mpPreference.shipment?.street_name,
        shipments_street_number: mpPreference.shipment?.street_number,
        shipments_floor: mpPreference.shipment?.floor,
        shipments_apartment: mpPreference.shipment?.apartment,
        shipments_city_name: mpPreference.shipment?.city_name,
        shipments_state_name: mpPreference.shipment?.state_name,
        shipments_country_name: mpPreference.shipment?.country_name,
        coupon_code: mpPreference.coupon_code,
        coupon_labels: mpPreference.coupon_labels,
        expiration_date_from: mpPreference.expiration_date_from,
        expiration_date_to: mpPreference.expiration_date_to,
        additional_info: mpPreference.additional_info + ' - ' + (mpPreference.items[0]?.id || ''),
        marketplace: mpPreference.marketplace,
        marketplace_fee: mpPreference.marketplace_fee,
        expires: mpPreference.expires,
        mp_preference_code: DEFAULT_PREFERENCE,
        mp_item_code: mpPreference.items[0]?.id,
      }
      return await this.payMPCallLogsRepository.save(mpCallLog)
    } catch (err) {
      console.log(err)
      const mpCallLog: IPayMPCallLog = {
        external_reference: 'ERR',
        installments: 0,
      }
      await this.payMPCallLogsRepository.save(mpCallLog)
      return null
    }
  }

  async updateMPCallLog(id: number, payment: any): Promise<void> {
    await this.payMPCallLogsRepository.update(
      { id: id },
      {
        external_reference: payment.external_reference,
        init_point: payment.init_point,
        mp_date_created: new Date(payment.date_created),
      },
    )
  }

  // ------------------------------- DASHBOARD ----------------------------------//
  async getSummaryStats(min_date: Date, max_date?: Date): Promise<IDBStats> {
    try {
      // console.log('*** summary Stats: ')
      // console.log(' -- min date: ' + min_date)
      // console.log(' -- max date: ' + max_date)
      const summaryStatsQuery = this.payMPPaymentsRepository
        .createQueryBuilder()
        .select('count(*)', 'sell_quantity')
        .addSelect('SUM(transaction_amount)', 'sells')
        .addSelect('AVG(transaction_amount)', 'ticket_avg')
        .where('status = :status', { status: 'approved' })
        .andWhere('date_approved > DATE(:min_date)', { min_date: min_date })

      if (max_date) {
        summaryStatsQuery.andWhere('date_approved <= DATE(:max_date)', { max_date: max_date })
      }
      const summaryStats = await summaryStatsQuery.getRawOne()
      return <IDBStats>summaryStats
    } catch (e) {
      throw e
    }
  }

  async getSummaryStatsByHour(min_date: Date, max_date?: Date): Promise<IStatsByTime[]> {
    try {
      // console.log('*** summary Stats by hour: ')
      // console.log(' -- min date: ' + min_date)
      // console.log(' -- max date: ' + max_date)
      // console.log('group by Hour')
      const summaryStatsQuery = this.payMPPaymentsRepository
        .createQueryBuilder()
        .select("DATE_FORMAT( date_created, '%Y-%m-%d %H:00:00' )", 'time')
        .addSelect('count(mp_id)', 'sell_quantity')
        .addSelect('SUM(transaction_amount)', 'sells')
        .addSelect('AVG(transaction_amount)', 'ticket_avg')
        .where('status = :status', { status: 'approved' })
        .andWhere('date_created >= DATE(:min_date)', { min_date: min_date })

      if (max_date) {
        summaryStatsQuery.andWhere('date_created < Date(:max_date)', { max_date: max_date })
      }
      const summaryStats = await summaryStatsQuery
        .groupBy('time')
        .orderBy('time', 'ASC')
        .getRawMany()
      return summaryStats
    } catch (e) {
      throw e
    }
  }

  async getSummaryStatsByDay(min_date: Date, max_date?: Date): Promise<IStatsByTime[]> {
    try {
      // console.log('*** summary Stats by day: ')
      // console.log(' -- min date: ' + min_date)
      // console.log(' -- max date: ' + max_date)
      // console.log('group by Day')
      const summaryStatsQuery = this.payMPPaymentsRepository
        .createQueryBuilder()
        .select('DATE(date_created)', 'time')
        .addSelect('count(mp_id)', 'sell_quantity')
        .addSelect('SUM(transaction_amount)', 'sells')
        .addSelect('AVG(transaction_amount)', 'ticket_avg')
        .where('(status = :status OR status is null)', { status: 'approved' })
        .andWhere('date_created > DATE(:min_date)', { min_date: min_date })

      if (max_date) {
        summaryStatsQuery.andWhere('date_created <= DATE(:max_date)', { max_date: max_date })
      }
      // console.log(summaryStatsQuery.getQueryAndParameters())
      const summaryStats = await summaryStatsQuery
        .groupBy('time')
        .orderBy('time', 'ASC')
        .getRawMany()
      return summaryStats
    } catch (e) {
      throw e
    }
  }

  async getSummaryStatsByWeek(min_date: Date, max_date?: Date): Promise<IStatsByTime[]> {
    try {
      // console.log('*** summary Stats by hour: ')
      // console.log(' -- min date: ' + min_date)
      // console.log(' -- max date: ' + max_date)
      console.log('group by Week')
      const summaryStatsQuery = this.payMPPaymentsRepository
        .createQueryBuilder()
        .select('WEEK(date_created)', 'week')
        .addSelect(
          "CONCAT(DATE(DATE_ADD(date_created, INTERVAL(2-DAYOFWEEK(date_created)) DAY)), ' - ', DATE(DATE_ADD(date_created, INTERVAL(8-DAYOFWEEK(date_created)) DAY)))",
          'time',
        )
        .addSelect('count(mp_id)', 'sell_quantity')
        .addSelect('SUM(transaction_amount)', 'sells')
        .addSelect('AVG(transaction_amount)', 'ticket_avg')
        .where('(status = :status OR status is null)', { status: 'approved' })
        .andWhere('date_created > DATE(:min_date)', { min_date: min_date })

      if (max_date) {
        summaryStatsQuery.andWhere('date_created <= DATE(:max_date)', { max_date: max_date })
      }
      const summaryStats = await summaryStatsQuery
        .groupBy('week')
        .orderBy('week', 'ASC')
        .getRawMany()
      return summaryStats
    } catch (e) {
      throw e
    }
  }

  async getPaymentByType(min_date: Date, max_date: Date): Promise<IPaymentsByType[]> {
    const paymentsByTypeQuery = this.payMPPaymentsRepository
      .createQueryBuilder()
      .select('payment_type_id', 'payment_type')
      .addSelect('SUM(transaction_amount)', 'amount')
      .addSelect('COUNT(mp_id)', 'quantity')
      .where('status = :status', { status: 'approved' })
      .andWhere('date_created >= DATE(:min_date)', { min_date: min_date })

    if (max_date) {
      paymentsByTypeQuery.andWhere('date_created <= DATE(:max_date)', { max_date: max_date })
    }
    const paymentsByType = await paymentsByTypeQuery.groupBy('payment_type').getRawMany()

    return paymentsByType
  }

  async getPaymentByStatus(min_date: Date, max_date: Date): Promise<IPaymentsByStatus[]> {
    try {
      const paymentsByStatusQuery = this.payMPPaymentsRepository
        .createQueryBuilder()
        .select('status', 'status')
        .addSelect('COUNT(mp_id)', 'quantity')
        .where('mp_id is not null')
        .andWhere('date_created >= DATE(:min_date)', { min_date: min_date })

      if (max_date) {
        paymentsByStatusQuery.andWhere('date_created <= DATE(:max_date)', { max_date: max_date })
      }
      const paymentsByStatus = await paymentsByStatusQuery.groupBy('status').getRawMany()
      return paymentsByStatus
    } catch (err) {
      throw err
    }
  }

  async getPaymentList(min_date: Date, max_date: Date): Promise<IPayMPPayment[]> {
    const paymentListQuery = await this.payMPPaymentsRepository
      .createQueryBuilder()
      .select('mp_id')
      .addSelect('operation_type')
      .addSelect('card_id_type')
      .addSelect('card_id_number')
      .addSelect('card_first_six_digits')
      .addSelect('date_approved')
      .addSelect('date_created')
      .addSelect('external_reference')
      .addSelect('fee_details_amount')
      .addSelect('fee_details_type')
      .addSelect('installments')
      .addSelect('order_type')
      .addSelect('payment_method_id')
      .addSelect('payment_type_id')
      .addSelect('status')
      .addSelect('status_detail')
      .addSelect('taxes_amount')
      .addSelect('transaction_amount')
      .addSelect('trans_details_net_received_amount')
      .addSelect('trans_details_total_paid_amount')
      .where('date_created >= DATE(:min_date)', { min_date: min_date })
      .andWhere('mp_id is not null')

    if (max_date) {
      paymentListQuery.andWhere('date_created <= DATE(:max_date)', { max_date: max_date })
    }

    const paymentList = await paymentListQuery.orderBy('date_created', 'DESC').getRawMany()
    return <IPayMPPayment[]>paymentList
  }

  async saveConfiguration(form: PayFormReq): Promise<void> {
    try {
      await this.payConfigurationRepository.update({ id: 1 }, { ...form })
    } catch (err) {
      throw err
    }
  }

  // ***************************************************************************
  // ***************************** PRIVATE METHODS *****************************
  private prepareToMP(submittedForm: SubmittedFormDto, payConfig: PayMPPreference): IMPPreference {
    const excludedPaymentMethods = payConfig.payment_excluded_method?.split(',').map((el) => {
      return { id: el }
    })
    const excludedPaymentTypes = payConfig.payment_excluded_types?.split(',').map((el) => {
      return { id: el }
    })
    const mpPreference: IMPPreference = {
      items: submittedForm.items,
      payer: submittedForm.payer,
      shipment: submittedForm.shipment,
      back_urls: {
        success: payConfig.back_url_success,
        failure: payConfig.back_url_failure,
        pending: payConfig.back_url_pending,
      },
      auto_return: payConfig.auto_return,
      notification_url: payConfig.notification_url,
      statement_descriptor: payConfig.statement_descriptor,
      payment_methods: {
        excluded_payment_methods: excludedPaymentMethods || [],
        excluded_payment_types: excludedPaymentTypes || [],
        installments: payConfig.payment_installments,
      },
      coupon_code: submittedForm.coupon,
      coupon_labels: submittedForm.coupon_label,
      additional_info: submittedForm.additional_info,
      installments: payConfig.payment_installments,
      marketplace: '',
      marketplace_fee: 0,
      expires: payConfig.expires,
      expiration_date_from: payConfig.expires ? new Date().toISOString() : null,
      expiration_date_to: payConfig.expires
        ? new Date(new Date().getTime() + 86400000).toISOString()
        : null,
    }
    return mpPreference
  }
}
