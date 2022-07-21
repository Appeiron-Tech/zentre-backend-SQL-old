import { Inject, Injectable } from '@nestjs/common'
import { TENANCY_CONNECTION } from 'src/public/tenancy/tenancy.provider'
import { MPPaymentsService } from 'src/third-party-apis/Mercado-pago/payments/mp-payments.service'
import { Repository, Connection } from 'typeorm'
import { PayConfiguration } from './database/pay-configuration.entity'
import { PayMPItem } from './database/pay-mp-item.entity'
import { DEFAULT_PREFERENCE, PayMPPreference } from './database/pay-mp-preference.entity'
import { IMPPreference } from './dto/mp-preference.interface'
import { SubmittedFormDto } from './dto/submittedForm.dto'

@Injectable()
export class PaymentsService {
  private readonly mpPreferenceRepository: Repository<PayMPPreference>
  private readonly mpItemRepository: Repository<PayMPItem>
  private readonly payConfigurationRepository: Repository<PayConfiguration>

  constructor(
    private mpPaymentService: MPPaymentsService,
    @Inject(TENANCY_CONNECTION) connection: Connection,
  ) {
    this.mpPreferenceRepository = connection.getRepository(PayMPPreference)
    this.payConfigurationRepository = connection.getRepository(PayConfiguration)
    this.mpItemRepository = connection.getRepository(PayMPItem)
  }

  async createMPPayment(submittedForm: SubmittedFormDto): Promise<any> {
    try {
      const defaultPreference = await this.getMPPreference(DEFAULT_PREFERENCE)
      const payConfiguration = await this.getPayConfiguration()
      const mpPreference = this.prepareToMP(submittedForm, defaultPreference)
      const payment = await this.mpPaymentService.createPayment(
        mpPreference,
        payConfiguration.mp_prod_access_token,
      )
      return payment
    } catch (error) {
      return { error: true, msg: 'Failed to create payment' }
    }
  }

  async getMPPreference(code: string): Promise<PayMPPreference> {
    try {
      return await this.mpPreferenceRepository.findOne({ code: code })
    } catch (error) {
      return error
    }
  }

  async getMPItem(code: string): Promise<PayMPItem> {
    try {
      console.log(code)
      return await this.mpItemRepository.findOne({ code: code })
    } catch (error) {
      return error
    }
  }

  async getPayConfiguration(): Promise<PayConfiguration> {
    const payForm = await this.payConfigurationRepository.findOne()
    return payForm
  }

  // async saveMPCallLog(mpResponse: )

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
      back_urls: {
        success: payConfig.back_url_success,
        failure: payConfig.back_url_failure,
        pending: payConfig.back_url_pending,
      },
      auto_return: payConfig.auto_return,
      notification_url: payConfig.notification_url,
      statement_descriptor: payConfig.statement_descriptor,
      external_reference: submittedForm.external_reference,
      payment_methods: {
        excluded_payment_methods: excludedPaymentMethods || [],
        excluded_payment_types: excludedPaymentTypes || [],
        installments: payConfig.payment_installments,
      },
      expires: payConfig.expires,
      expiration_date_from: payConfig.expires ? new Date().toISOString() : null,
      expiration_date_to: payConfig.expires
        ? new Date(new Date().getTime() + 86400000).toISOString()
        : null,
    }
    return mpPreference
  }
}
