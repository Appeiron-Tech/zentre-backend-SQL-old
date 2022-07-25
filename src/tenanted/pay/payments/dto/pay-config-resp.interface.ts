import { IMPItem } from './interfaces/mp-item.interface'
import { PayConfigurationReadDto } from './pay-configuration-read.dto'

export interface PayConfigurationResp {
  pay_form: PayConfigurationReadDto
  item: IMPItem
}
