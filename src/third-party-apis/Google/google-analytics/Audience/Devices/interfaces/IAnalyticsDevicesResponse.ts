import { IAnalyticsDevice } from './IAnalyticsDevice'

export interface IAnalyticsDevicesResponse {
  sessions: number
  users: number
  newUsers: number
  bounceRate: number
  viewsPerSession: number
  avgSessionDuration: number
  devices: IAnalyticsDevice[]
}
