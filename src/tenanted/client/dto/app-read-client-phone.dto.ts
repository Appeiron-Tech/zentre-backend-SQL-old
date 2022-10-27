import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class AppReadClientPhone {
  @Expose()
  phone: number

  @Expose()
  countryCode: number

  @Expose()
  type: string

  @Expose()
  isWspMain: boolean
}
