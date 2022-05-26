import { IsArray, IsLatitude, IsLongitude, IsOptional } from 'class-validator'
import { CreateStorePhoneDto } from './create-store-phone.dto'

export class ReqUpdateStoreDto {
  @IsOptional()
  store?: string

  @IsOptional()
  description?: string

  @IsOptional()
  address?: string

  @IsOptional()
  isMain?: boolean

  @IsOptional()
  @IsLatitude()
  latitude?: number

  @IsOptional()
  @IsLongitude()
  longitude?: number

  @IsOptional()
  cityId?: number

  @IsOptional()
  @IsArray()
  phones?: CreateStorePhoneDto[]
}
