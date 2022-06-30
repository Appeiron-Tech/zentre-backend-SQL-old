import { ICountryResults } from './ICountryResults'

export interface IAnalyticsResponse {
  pageViews: string
  sessions: string
  users: string
  countries: ICountryResults[]
}
