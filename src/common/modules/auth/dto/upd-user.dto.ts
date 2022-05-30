import { Exclude, Expose } from 'class-transformer'
import { IsOptional, IsString, IsUrl, MaxLength, MinLength } from 'class-validator'

@Exclude()
export class UpdUserDto {
  @IsOptional()
  @MaxLength(64)
  @IsString()
  @Expose()
  userName?: string

  @IsOptional()
  @MaxLength(16)
  @IsString()
  @Expose()
  rol?: string

  @IsOptional()
  @MaxLength(2)
  @MinLength(2)
  @IsString()
  @Expose()
  language?: string

  @IsOptional()
  @MaxLength(3)
  @MinLength(3)
  @IsString()
  @Expose()
  country?: string

  @IsOptional()
  @MaxLength(64)
  @IsString()
  @Expose()
  firstName?: string

  @IsOptional()
  @MaxLength(128)
  @IsString()
  @Expose()
  lastName?: string

  @IsOptional()
  @IsString()
  @Expose()
  password?: string

  @IsOptional()
  @IsUrl()
  @Expose()
  photo?: string
}
