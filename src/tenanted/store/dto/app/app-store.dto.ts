import { Exclude, Expose, plainToClass } from 'class-transformer'
import { AppStoreOpeningHour } from './app-store-opening-hour.dto'
import { AppStorePhone } from './app-store-phone.dto'
import { AppStoreWorker } from './app-store-worker.dto'

@Exclude()
export class ReadStoreDto {
  @Expose()
  id: number

  @Expose()
  name: string

  @Expose()
  description?: string

  @Expose()
  address: string

  @Expose()
  logo: string

  @Expose()
  cover: string

  @Expose()
  isMain: boolean

  @Expose()
  latitude?: number

  @Expose()
  longitude?: number

  @Expose()
  cityId?: number

  @Expose()
  isOpenAlways: boolean

  @Expose()
  phones?: AppStorePhone[]

  // @Expose()
  // storeProducts?: StoreProduct[]

  @Expose()
  workers?: AppStoreWorker[]

  @Expose()
  openingHours?: AppStoreOpeningHour[]
}

export function parseAppReadPhones(phones: any[]): AppStorePhone[] {
  const readStorePhones = []
  phones.forEach((storePhone) => {
    readStorePhones.push(plainToClass(AppStorePhone, storePhone))
  })
  return readStorePhones
}

// export function parseAppReadSns(sns: any[]): AppStoreSN[] {
//   const readStoreSns = []
//   sns.forEach((storeSn) => {
//     readStoreSns.push(plainToClass(AppStoreSN, storeSn))
//   })
//   return readStoreSns
// }

export function parseAppReadOpeningHours(openingHours: any[]): AppStoreOpeningHour[] {
  const readOpeningHours = []
  openingHours.forEach((openingHour) => {
    readOpeningHours.push(plainToClass(AppStoreOpeningHour, openingHour))
  })
  return readOpeningHours
}
