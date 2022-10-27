import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class AppReadAnnouncement {
  @Expose()
  id: number

  @Expose()
  screenCode?: string

  @Expose()
  title?: string

  @Expose()
  description?: string

  @Expose()
  color?: string

  @Expose()
  url?: string

  @Expose()
  image?: string

  @Expose()
  initAt?: Date

  @Expose()
  finishAt?: Date

  @Expose()
  isActive: boolean
}
