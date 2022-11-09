import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class AppStoreSN {
  @Expose()
  code: string

  @Expose()
  url: string

  @Expose()
  show: boolean
}
