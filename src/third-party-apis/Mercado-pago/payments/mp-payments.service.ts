import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import axios from 'axios'
import { IMPPreference } from './interfaces/mp-preference.interface'
// import { configure as MPConfigure, preferences } from 'mercadopago'

@Injectable()
export class MPPaymentsService {
  // Preference object
  preference = {
    items: [
      {
        id: 'item-ID-1234',
        title: 'Mi producto 1',
        currency_id: 'PEN',
        picture_url: 'https://www.mercadopago.com/org-img/MP3/home/logomp3.gif',
        description: 'Descripción del Item 1',
        category_id: 'class 1',
        quantity: 1,
        unit_price: 66.5,
      },
      {
        id: 'item-ID-2345',
        title: 'Mi producto 2',
        currency_id: 'PEN',
        picture_url: 'https://www.mercadopago.com/org-img/MP3/home/logomp3.gif',
        description: 'Descripción del Item 2',
        category_id: 'class 2',
        quantity: 1,
        unit_price: 75.76,
      },
    ],
    payer: {
      name: 'Juan',
      surname: 'Lopez',
      email: 'user@email.com',
      phone: {
        area_code: '11',
        number: '4444-4444',
      },
      identification: {
        type: 'DNI',
        number: '12345678',
      },
      address: {
        street_name: 'Street',
        street_number: 123,
        zip_code: '5700',
      },
    },
    back_urls: {
      success: 'https://www.success.com',
      failure: 'http://www.failure.com',
      pending: 'http://www.pending.com',
    },
    auto_return: 'approved',
    payment_methods: {
      excluded_payment_methods: [
        {
          id: 'master',
        },
      ],
      excluded_payment_types: [
        {
          id: 'ticket',
        },
      ],
      installments: 12,
    },
    notification_url: 'https://www.appeironhub.com/ipn',
    statement_descriptor: 'MINEGOCIO',
    external_reference: 'Reference_1234',
    expires: true,
    expiration_date_from: '2016-02-01T12:00:00.000-04:00',
    expiration_date_to: '2016-02-28T12:00:00.000-04:00',
  }
  constructor(private configService: ConfigService) {}

  // setup(): void {
  //   MPConfigure({
  //     access_token: 'TEST-4450845471822403-061723-e4b8a7031e56ec51d3979ab71ec4a5d3-1144869601',
  //   })
  // }

  // async preferences(): Promise<void> {
  //   preferences
  //     .create(this.preference)
  //     .then((response) => {
  //       console.log(response.body)
  //       // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // }

  async createPayment(mpPreference: IMPPreference): Promise<any> {
    const url = 'https://api.mercadopago.com/checkout/preferences'
    const body = mpPreference

    const payment = await axios.post(url, body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer APP_USR-7422375236748514-071800-5cf4da2be6d0df61015acfaca7d26e21-1162617732`,
      },
    })

    return payment.data
  }
}
