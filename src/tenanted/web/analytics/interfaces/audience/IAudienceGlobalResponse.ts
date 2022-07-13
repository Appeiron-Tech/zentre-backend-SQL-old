import { IByAudienceResponse as IByAudienceResponse } from './IByAudienceResponse'

export interface IAudienceResponse {
  sessions: number
  users: number
  newUsers: number
  bounceRate: number
  viewsPerSession: number
  avgSessionDuration: number
  data: IByAudienceResponse[]
}
