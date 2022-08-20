import { IHubClient } from './hub-client-resp.dto'

export interface IHubSn {
  code: string
  enable: boolean
}

export interface IHubApp {
  code: string
  name: string
  enable: boolean
}

export class HubAdmRespDto {
  client: IHubClient
  client_sns: IHubSn[]
  app_buttons: IHubApp[]
}
