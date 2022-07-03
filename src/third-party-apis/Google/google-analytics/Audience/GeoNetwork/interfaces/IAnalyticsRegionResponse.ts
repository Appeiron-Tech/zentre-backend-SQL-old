import { IRegionResults } from './IRegionResults'

export interface IAnalyticsRegionResponse {
  pageViews: string
  sessions: string
  users: string
  data: IRegionResults
}
