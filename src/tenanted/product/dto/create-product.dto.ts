import {
  IsBoolean,
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator'

export class CreateProductDto {
  @IsOptional()
  @IsString()
  @MaxLength(12)
  sku?: string

  @IsOptional()
  @IsNumber()
  ean?: number

  @IsNotEmpty()
  @IsString()
  @MaxLength(64)
  name: string

  @IsOptional()
  @IsString()
  @MaxLength(256)
  description?: string

  @IsOptional()
  @IsNumber()
  categoryId?: number

  @IsNotEmpty()
  @IsNumber()
  pos: number

  @IsOptional()
  @IsUrl()
  @MaxLength(256)
  image?: string

  @IsOptional()
  @IsDecimal({ IsDecimalOptions: { decimal_digits: 2 } })
  price?: number

  @IsOptional()
  @IsNumber()
  variantId?: number

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean
}
