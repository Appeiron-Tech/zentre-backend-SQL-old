import { IRegionResults } from './IRegionResults'

export interface IAnalyticsCountryRegionResponse {
  pageViews: string
  sessions: string
  users: string
  data: IRegionResults
}
