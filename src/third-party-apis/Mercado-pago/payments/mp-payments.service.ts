import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import axios from 'axios'
import { IMPPreference } from './interfaces/mp-preference.interface'

@Injectable()
export class MPPaymentsService {
  // Preference object
  // preference = {
  //   items: [
  //     {
  //       id: 'item-ID-1234',
  //       title: 'Mi producto 1',
  //       currency_id: 'PEN',
  //       picture_url: 'https://www.mercadopago.com/org-img/MP3/home/logomp3.gif',
  //       description: 'Descripción del Item 1',
  //       category_id: 'class 1',
  //       quantity: 1,
  //       unit_price: 66.5,
  //     },
  //     {
  //       id: 'item-ID-2345',
  //       title: 'Mi producto 2',
  //       currency_id: 'PEN',
  //       picture_url: 'https://www.mercadopago.com/org-img/MP3/home/logomp3.gif',
  //       description: 'Descripción del Item 2',
  //       category_id: 'class 2',
  //       quantity: 1,
  //       unit_price: 75.76,
  //     },
  //   ],
  //   payer: {
  //     name: 'Juan',
  //     surname: 'Lopez',
  //     email: 'user@email.com',
  //     phone: {
  //       area_code: '11',
  //       number: '4444-4444',
  //     },
  //     identification: {
  //       type: 'DNI',
  //       number: '12345678',
  //     },
  //     address: {
  //       street_name: 'Street',
  //       street_number: 123,
  //       zip_code: '5700',
  //     },
  //   },
  //   back_urls: {
  //     success: 'https://www.success.com',
  //     failure: 'http://www.failure.com',
  //     pending: 'http://www.pending.com',
  //   },
  //   auto_return: 'approved',
  //   payment_methods: {
  //     excluded_payment_methods: [
  //       {
  //         id: 'master',
  //       },
  //     ],
  //     excluded_payment_types: [
  //       {
  //         id: 'ticket',
  //       },
  //     ],
  //     installments: 12,
  //   },
  //   notification_url: 'https://www.appeironhub.com/ipn',
  //   statement_descriptor: 'MINEGOCIO',
  //   external_reference: 'Reference_1234',
  //   expires: true,
  //   expiration_date_from: '2016-02-01T12:00:00.000-04:00',
  //   expiration_date_to: '2016-02-28T12:00:00.000-04:00',
  // }
  constructor(private configService: ConfigService) {}

  async createPayment(mpPreference: IMPPreference, clientAccessToken: string): Promise<any> {
    const apiEP = this.configService.get<string>('MP_API_EP')
    const payment = await axios.post(apiEP, mpPreference, {
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer APP_USR-7422375236748514-071800-5cf4da2be6d0df61015acfaca7d26e21-1162617732`,
        Authorization: clientAccessToken,
      },
    })
    return payment.data
  }
}
