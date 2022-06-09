import { Exclude } from 'class-transformer'
import { IsOptional, IsString, MaxLength } from 'class-validator'

export class UpdateClientDto {
  @IsOptional()
  @IsString()
  @MaxLength(1028)
  description?: string

  @IsOptional()
  @IsString()
  @MaxLength(16)
  businessType?: string

  @IsOptional()
  @IsString()
  @MaxLength(3)
  currencyName?: string

  @IsOptional()
  @IsString()
  @MaxLength(3)
  currencySymbol?: string

  @IsOptional()
  @IsString()
  @MaxLength(512)
  urlIG?: string

  @IsOptional()
  @IsString()
  @MaxLength(512)
  urlFB?: string

  @IsOptional()
  @IsString()
  @MaxLength(6)
  brightness?: string

  @IsOptional()
  @MaxLength(6)
  @IsString()
  primary?: string

  @IsOptional()
  @IsString()
  @MaxLength(6)
  onPrimary?: string

  @IsOptional()
  @IsString()
  @MaxLength(6)
  secondary?: string

  @IsOptional()
  @IsString()
  @MaxLength(6)
  onSecondary?: string

  @IsOptional()
  @IsString()
  @MaxLength(6)
  error?: string

  @IsOptional()
  @IsString()
  @MaxLength(6)
  onError?: string

  @IsOptional()
  @IsString()
  @MaxLength(6)
  background?: string

  @IsOptional()
  @IsString()
  @MaxLength(6)
  onBackground?: string

  @IsOptional()
  @IsString()
  @MaxLength(6)
  surface?: string

  @IsOptional()
  @IsString()
  @MaxLength(6)
  onSurface?: string

  @IsOptional()
  stock_quantity?: number

  @Exclude()
  answers?: any[]

  @Exclude()
  phones?: any[]
}
