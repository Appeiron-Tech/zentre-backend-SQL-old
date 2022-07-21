import { PayConfiguration } from '../database/pay-configuration.entity'
import { IMPItem } from './mp-item.interface'

export interface PayFormConfigResp {
  pay_form: PayConfiguration
  item: IMPItem
}
