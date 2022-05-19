import { IsArray, IsLatitude, IsLongitude, IsOptional } from 'class-validator'
import { UpdStorePhoneDto } from './upd-store-phone.dto'

export class UpdateStoreDto {
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
  phones?: UpdStorePhoneDto[]
}
