import { IsArray, IsLatitude, IsLongitude, IsOptional } from 'class-validator'
import { CreateStorePhoneDto } from './create-store-phone.dto'

export class CreateStoreDto {
  store: string
  description?: string
  address: string

  isMain: boolean

  @IsOptional()
  @IsLatitude()
  latitude?: number

  @IsOptional()
  @IsLongitude()
  longitude?: number

  cityId?: number

  @IsArray()
  phones?: CreateStorePhoneDto[]

  isOpenAlways: boolean
}
