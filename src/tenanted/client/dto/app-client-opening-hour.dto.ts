import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class AppClientOpeningHour {
  @Expose()
  weekDay: number

  @Expose()
  fromHour: string

  @Expose()
  toHour: string
}
