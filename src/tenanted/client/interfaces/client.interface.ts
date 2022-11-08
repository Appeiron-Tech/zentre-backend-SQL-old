import { IClientApp } from './client-app.interface'
import { IClientOpeningHour } from './client-opening-hour.interface'
import { IClientPhone } from './client-phone.interface'
import { IClientSN } from './client-sn.interface'

export interface IClient {
  id: number
  tenancyId: number
  tenancyName: string
  name: string
  description: string
  address: string
  logo: string
  cover: string
  favicon: string
  currencyName: string
  currencySymbol: string
  businessType: string
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
  apps: IClientApp[]
  sns: IClientSN[]
  openingHours: IClientOpeningHour[]
  createdAt: number
}
