import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class ReadHubSurvey {
  @Expose()
  storeId: number

  @Expose()
  rate: number

  @Expose()
  comment: string

  @Expose()
  createdAt: number
}
