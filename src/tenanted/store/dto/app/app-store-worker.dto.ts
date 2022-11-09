import { Exclude, Expose } from 'class-transformer'
import { IStoreWorker } from '../../interfaces/store-worker.interface'

@Exclude()
export class AppStoreWorker implements IStoreWorker {
  @Expose()
  id: number

  @Expose()
  name: string

  @Expose()
  email: string

  @Expose()
  jobTitle?: string

  @Expose()
  phone?: number

  @Expose()
  countryCode?: number

  @Expose()
  phoneType?: string

  @Expose()
  isActive?: boolean
}
