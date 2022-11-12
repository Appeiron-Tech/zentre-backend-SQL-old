import { IClientApp } from './client-app.interface'
import { IClientSN } from './client-sn.interface'

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
  ga_email_analytics: string
  ga_view_id: string
  ga_api_key: string
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
  apps: IClientApp[]
  sns: IClientSN[]
  createdAt: number
}
