import { PayConfiguration } from '../database/pay-configuration.entity'
import { IMPItem } from './mp-item.interface'

export interface PayConfigurationResp {
  pay_form: PayConfiguration
  item: IMPItem
}
