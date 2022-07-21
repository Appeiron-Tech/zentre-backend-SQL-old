import { PayForm } from '../database/pay-form.entity'
import { IMPItem } from './mp-item.interface'

export interface PayFormConfigResp {
  pay_form: PayForm
  item: IMPItem
}
