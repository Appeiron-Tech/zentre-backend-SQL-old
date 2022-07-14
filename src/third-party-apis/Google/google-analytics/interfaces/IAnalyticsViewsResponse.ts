import { IBasicResults } from './IBasicResults'

export interface IAnalyticsViewsResponse {
  users: number
  sessions: number
  bounceRate: number
  sessionDuration: number
  dates: IBasicResults[]
}
