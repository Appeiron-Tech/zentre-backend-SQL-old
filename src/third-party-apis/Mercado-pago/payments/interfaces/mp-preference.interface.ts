import { IMPItem } from './mp-item.interface'
import { IMPPayer } from './mp-payer.interface'

export interface IBasicKayValue {
  id: string
}

export interface IMPPreference {
  items: IMPItem[]
  payer: IMPPayer
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
  external_reference?: string
  expires: boolean
  expiration_date_from?: string
  expiration_date_to?: string
}
