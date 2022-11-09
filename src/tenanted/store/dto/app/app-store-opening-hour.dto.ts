import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class AppStoreOpeningHour {
  @Expose()
  weekDay: number

  @Expose()
  fromHour: string

  @Expose()
  toHour: string
}
