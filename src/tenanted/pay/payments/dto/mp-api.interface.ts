import { IMPItem } from './mp-item.interface'
import { IMPPayer } from './mp-payer.interface'
import { IBasicKayValue } from './mp-preference.interface'

export interface IMPAPIResp {
  additional_info: string
  auto_return: string
  back_urls: {
    failure: string
    pending: string
    success: string
  }
  binary_mode: boolean
  client_id: string
  collector_id: number
  coupon_code: any
  coupon_labels: any
  date_created: string
  date_of_expiration: string
  expiration_date_from: string
  expiration_date_to: string
  expires: boolean
  external_reference: string
  id: string
  init_point: string
  internal_metadata: string
  items: IMPItem[]
  marketplace: string
  marketplace_fee: number
  metadata: any
  notification_url: string
  operation_type: string
  payer: IMPPayer
  payment_methods: {
    default_card_id: any
    default_payment_method_id: any
    excluded_payment_methods: IBasicKayValue[]
    excluded_payment_types: IBasicKayValue[]
    installments: number
    default_installments: number
  }
  processing_modes: any
  product_id: any
  redirect_urls: {
    failure: string
    pending: string
    success: string
  }
  sandbox_init_point: string
  site_id: string
  shipments: {
    default_shipping_method: any
    receiver_address: {
      zip_code: string
      street_name: string
      street_number: any
      floor: string
      apartment: string
      city_name: string
      state_name: string
      country_name: string
    }
  }
  statement_descriptor: string
  total_amount: any
  last_updated: any
}

// "additional_info": "",
// "auto_return": "approved",
// "back_urls": {
//     "failure": "https://www.appeironhub.com/pay/failure",
//     "pending": "https://www.appeironhub.com/pay/pending",
//     "success": "https://www.appeironhub.com/pay/success"
// },
// "binary_mode": false,
// "client_id": "7422375236748514",
// "collector_id": 1162617732,
// "coupon_code": null,
// "coupon_labels": null,
// "date_created": "2022-07-19T21:21:49.578-04:00",
// "date_of_expiration": null,
// "expiration_date_from": null,
// "expiration_date_to": null,
// "expires": false,
// "external_reference": "custome payment",
// "id": "1162617732-96c07d53-f23e-497a-b0bf-e2d05ed570b6",
// "init_point": "https://www.mercadopago.com.pe/checkout/v1/redirect?pref_id=1162617732-96c07d53-f23e-497a-b0bf-e2d05ed570b6",
// "internal_metadata": null,
// "items": [
//     {
//         "id": "ITM1",
//         "category_id": "class 1",
//         "currency_id": "PEN",
//         "description": "Descripción del Item 1",
//         "picture_url": "https://www.mercadopago.com/org-img/MP3/home/logomp3.gif",
//         "title": "Mi producto 1",
//         "quantity": 1,
//         "unit_price": 66.5
//     }
// ],
// "marketplace": "NONE",
// "marketplace_fee": 0,
// "metadata": {},
// "notification_url": "https://www.dev.appeironhub.com/ipn",
// "operation_type": "regular_payment",
// "payer": {
//     "phone": {
//         "area_code": "11",
//         "number": "4444-4444"
//     },
//     "address": {
//         "zip_code": "",
//         "street_name": "",
//         "street_number": null
//     },
//     "email": "test_user_74631398@testuser.com",
//     "identification": {
//         "number": "12345678",
//         "type": "DNI"
//     },
//     "name": "ernesto",
//     "surname": "",
//     "date_created": null,
//     "last_purchase": null
// },
// "payment_methods": {
//     "default_card_id": null,
//     "default_payment_method_id": null,
//     "excluded_payment_methods": [
//         {
//             "id": ""
//         }
//     ],
//     "excluded_payment_types": [
//         {
//             "id": ""
//         }
//     ],
//     "installments": 1,
//     "default_installments": null
// },
// "processing_modes": null,
// "product_id": null,
// "redirect_urls": {
//     "failure": "",
//     "pending": "",
//     "success": ""
// },
// "sandbox_init_point": "https://sandbox.mercadopago.com.pe/checkout/v1/redirect?pref_id=1162617732-96c07d53-f23e-497a-b0bf-e2d05ed570b6",
// "site_id": "MPE",
// "shipments": {
//     "default_shipping_method": null,
//     "receiver_address": {
//         "zip_code": "",
//         "street_name": "",
//         "street_number": null,
//         "floor": "",
//         "apartment": "",
//         "city_name": null,
//         "state_name": null,
//         "country_name": null
//     }
// },
// "statement_descriptor": "default descriptor",
// "total_amount": null,
// "last_updated": null
// }
