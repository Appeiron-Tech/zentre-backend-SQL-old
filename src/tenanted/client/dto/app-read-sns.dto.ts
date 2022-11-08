import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class AppClientSN {
  @Expose()
  code: string

  @Expose()
  url: string

  @Expose()
  show: boolean
}
