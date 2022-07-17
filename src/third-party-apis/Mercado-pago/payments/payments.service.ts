import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { configure as MPConfigure, create } from 'mercadopago'

@Injectable()
export class PaymentsService {
  // Preference object
  preference = {
    items: [
      {
        id: 'item-ID-1234',
        title: 'Mi producto',
        currency_id: 'PEN',
        picture_url: 'https://www.mercadopago.com/org-img/MP3/home/logomp3.gif',
        description: 'Descripción del Item',
        category_id: 'art',
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
    notification_url: 'https://www.your-site.com/ipn',
    statement_descriptor: 'MINEGOCIO',
    external_reference: 'Reference_1234',
    expires: true,
    expiration_date_from: '2016-02-01T12:00:00.000-04:00',
    expiration_date_to: '2016-02-28T12:00:00.000-04:00',
  }
  constructor(private configService: ConfigService) {}

  setup(): void {
    MPConfigure({
      access_token: this.configService.get('MP_TEST_ACCESS_TOKEN'),
    })
  }

  async preferences(): Promise<void> {
    create(this.preference)
      .then((response) => {
        // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
