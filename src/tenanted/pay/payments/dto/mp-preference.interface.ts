import { IMPItem } from './mp-item.interface'
import { IMPPayer } from './mp-payer.interface'

export interface IBasicKayValue {
  id: string
}

export interface IMPShipment {
  zip_code?: string
  street_name?: string
  street_number?: any
  floor?: string
  apartment?: string
  city_name?: string
  state_name?: string
  country_name?: string
}

export interface IMPPreference {
  items: IMPItem[]
  payer: IMPPayer
  shipment: IMPShipment
  back_urls: {
    success: string
    failure: string
    pending: string
  }
  auto_return: string
  payment_methods: {
    excluded_payment_methods: IBasicKayValue[]
    excluded_payment_types: IBasicKayValue[]
    installments: number
  }
  notification_url: string
  statement_descriptor: string
  expires: boolean
  expiration_date_from?: string
  expiration_date_to?: string
  external_reference?: string
  coupon_code?: string
  coupon_labels?: string
  additional_info?: string
  installments: number
  marketplace: string
  marketplace_fee: number
}
