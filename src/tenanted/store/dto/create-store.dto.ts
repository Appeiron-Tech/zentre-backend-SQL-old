import {
  IsArray,
  IsBoolean,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsOptional,
} from 'class-validator'
import { CreateStorePhoneDto } from './create-store-phone.dto'

export class CreateStoreDto {
  name: string
  storeId: number
  description?: string
  address: string

  @IsNotEmpty()
  @IsBoolean()
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
