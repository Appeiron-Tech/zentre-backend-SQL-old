import { ClientAnswer } from '../database/entities/client-answer.entity'
import { IClientPhone } from '../interfaces/client-phone.interface'

export class ReadClientDto {
  description?: string
  currencyName?: string
  currencySymbol?: string
  businessType?: string
  urlIG?: string
  urlFB?: string
  brightness?: string
  primary?: string
  onPrimary?: string
  secondary?: string
  onSecondary?: string
  error?: string
  onError?: string
  background?: string
  onBackground?: string
  surface?: string
  onSurface?: string
  phones?: IClientPhone[]
  answers?: ClientAnswer[]
}
