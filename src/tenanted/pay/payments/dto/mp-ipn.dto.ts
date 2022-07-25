export interface IIPNData {
  id: string
}

export class IPNBody {
  action: string
  api_version: string
  data: IIPNData
  date_created: Date
  id: number
  live_mode: boolean
  type: string
  user_id: string
}
