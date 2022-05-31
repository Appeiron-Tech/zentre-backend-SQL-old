import { IsOptional, IsString, MaxLength } from 'class-validator'

export class UpdTenancyDto {
  @IsOptional()
  @IsString()
  @MaxLength(256)
  description?: string

  @IsOptional()
  @IsString()
  @MaxLength(256)
  logo?: string
}
