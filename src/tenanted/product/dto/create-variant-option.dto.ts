import {
  IsBoolean,
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'

export class VariantOptionDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(32)
  name: string

  @IsNotEmpty()
  @IsNumber()
  variantId: number

  @IsOptional()
  @IsString()
  @MaxLength(256)
  description?: string

  @IsOptional()
  @IsDecimal({ IsDecimalOptions: { decimal_digits: 2 } })
  price?: number

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean
}
