import { IBasicResponse } from '../IBasicResponse'

export interface ICountryResponse {
  pageViews: string
  sessions: string
  users: string
  countries: IBasicResponse[]
}
