import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import axios from 'axios'
import { IMPPreference } from './interfaces/mp-preference.interface'

@Injectable()
export class MPPaymentsService {
  constructor(private configService: ConfigService) {}

  async createPayment(mpPreference: IMPPreference, clientAccessToken: string): Promise<any> {
    const apiEP = this.configService.get<string>('MP_CHECKOUT_API_EP')
    const payment = await axios.post(apiEP, mpPreference, {
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer APP_USR-7422375236748514-071800-5cf4da2be6d0df61015acfaca7d26e21-1162617732`,
        Authorization: clientAccessToken,
      },
    })
    return payment.data
  }

  async getPaymentStatus(paymentId: string, clientAccessToken: string): Promise<any> {
    const apiEP = this.configService.get<string>('MP_PAYMENT_API_EP') + '/' + paymentId + '/'
    const payment = await axios.get(apiEP, {
      params: {
        access_token: clientAccessToken,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return payment.data
  }
}
