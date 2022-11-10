import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class ReadHubContact {
  @Expose()
  storeId: number

  @Expose()
  userName: string

  @Expose()
  contactType: number

  @Expose()
  contact: string

  @Expose()
  message: string
}
