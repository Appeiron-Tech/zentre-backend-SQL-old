import { Exclude, Expose } from 'class-transformer'
import { IsLatitude, IsLongitude, IsNotEmpty, IsOptional } from 'class-validator'

@Exclude()
export class UpdateStoreDto {
  @IsOptional()
  @Expose()
  store?: string

  @IsOptional()
  @Expose()
  description?: string

  @IsOptional()
  @Expose()
  address?: string

  @IsNotEmpty()
  @Expose()
  isMain: boolean

  @IsOptional()
  @IsLatitude()
  @Expose()
  latitude?: number

  @IsOptional()
  @IsLongitude()
  @Expose()
  longitude?: number

  @IsOptional()
  @Expose()
  cityId?: number
}
