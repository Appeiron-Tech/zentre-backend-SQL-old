import { Body, Controller, Get, HttpException, Param, Post, Query } from '@nestjs/common'
import { IMPPaymentStatus } from './dto/pay-mp-payment-status.interface'
import { IPNBody } from './dto/mp-ipn.dto'
import { PayConfigurationResp } from './dto/pay-config-resp.interface'
import { IPayMPPayment } from './dto/pay-mp-payment.dto'
import { SubmittedFormDto } from './dto/submittedForm.dto'
import { PaymentsService } from './payments.service'

@Controller('tenant/pay')
export class PaymentsController {
  constructor(private paymentService: PaymentsService) {}

  @Get()
  async getFormConfig(@Query('item_code') item_code?: string): Promise<PayConfigurationResp> {
    let mpItem = null
    const payForm = await this.paymentService.getPayConfiguration()
    if (item_code) mpItem = await this.paymentService.getMPItem(item_code)
    return {
      pay_form: payForm,
      item: mpItem,
    }
  }

  @Post('mercadopago')
  async sendMPPayment(@Body() submittedForm: SubmittedFormDto): Promise<string> {
    try {
      const mpResponse = await this.paymentService.createMPCall(submittedForm)
      return mpResponse?.init_point || mpResponse
    } catch (err) {
      return err
    }
  }

  @Post('ipn')
  async mercadopagoIPN(
    @Query('data.id') data_id: string,
    @Query('type') type: string,
    @Body() ipnBody: IPNBody,
  ): Promise<any> {
    if (ipnBody) {
      const basicMPPayment: IPayMPPayment = {
        mp_id: ipnBody.data.id,
        operation_type: ipnBody.type,
      }
      const createdMPPayment = await this.paymentService.createMPPayment(basicMPPayment)
      try {
        const mpPaymentStatus = await this.getMPPaymentStatus(ipnBody.data.id)
        await this.paymentService.updateMPPayment(createdMPPayment.id, mpPaymentStatus)
      } catch (err) {
        console.log(err)
      }
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

  // @Post('paypal')
  // async sendPPPayment(@Body() submittedInfo: SubmittedInfoDto): Promise<string> {
  //   const payConfig = this.paymentService.getMPConfigurations
  //   return 'erwre'
  // }
}
