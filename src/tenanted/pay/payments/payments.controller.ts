import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { PayFormConfigResp } from './dto/pay-form-config-resp.interface'
import { SubmittedFormDto } from './dto/submittedForm.dto'
import { PaymentsService } from './payments.service'

@Controller('tenant/pay')
export class PaymentsController {
  constructor(private paymentService: PaymentsService) {}

  @Get()
  async getFormConfig(@Query('item_code') item_code?: string): Promise<PayFormConfigResp> {
    let mpItem = null
    const payForm = await this.paymentService.getFormConfig()
    if (item_code) mpItem = await this.paymentService.getMPItem(item_code)
    return {
      pay_form: payForm,
      item: mpItem,
    }
  }

  @Post('mercadopago')
  async sendMPPayment(@Body() submittedForm: SubmittedFormDto): Promise<string> {
    const mpResponse = await this.paymentService.createMPPayment(submittedForm)
    return mpResponse
  }

  // @Post('paypal')
  // async sendPPPayment(@Body() submittedInfo: SubmittedInfoDto): Promise<string> {
  //   const payConfig = this.paymentService.getMPConfigurations
  //   return 'erwre'
  // }
}
