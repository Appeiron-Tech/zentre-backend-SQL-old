import { IClientPhone } from './client-phone.interface'

export interface IClient {
  id: number
  tenancyId: number
  tenancyName: string
  name: string
  description: string
  logo: string
  cover: string
  favicon: string
  currencyName: string
  currencySymbol: string
  businessType: string
  urlIG: string
  urlFB: string
  brightness: string
  primary: string
  onPrimary: string
  secondary: string
  onSecondary: string
  error: string
  onError: string
  background: string
  onBackground: string
  surface: string
  onSurface: string
  phones: IClientPhone[]
  createdAt: number
}
