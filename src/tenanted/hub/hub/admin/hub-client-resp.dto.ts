import { Exclude, Expose } from 'class-transformer'

export interface IHubClient {
  cover: string
  logo: string
  name: string
  description: string
}

@Exclude()
export class HubClientDto {
  @Expose()
  cover: string

  @Expose()
  logo: string

  @Expose()
  name: string

  @Expose()
  description: string
}
