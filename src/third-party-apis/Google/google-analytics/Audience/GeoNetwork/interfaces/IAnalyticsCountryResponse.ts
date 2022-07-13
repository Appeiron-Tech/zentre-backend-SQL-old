import { IBasicResults } from '../../../interfaces/IBasicResults'

export interface IAnalyticsCountryResponse {
  pageViews: string
  sessions: string
  users: string
  countries: IBasicResults[]
}
