import { IBasicResults } from 'src/third-party-apis/Google/google-analytics/interfaces/IBasicResults'

export interface IRegionResponse {
  pageViews: string
  sessions: string
  users: string
  data: IRegionResults
}

interface IRegionResults {
  country: string
  regions: IBasicResults[]
}
