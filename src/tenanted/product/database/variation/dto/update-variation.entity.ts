import { IsBoolean, IsDate, IsDecimal, IsOptional, IsString, MaxLength } from 'class-validator'

export class UpdateVariationDto {
  @IsOptional()
  @IsDecimal()
  price?: number

  @IsOptional()
  @IsString()
  @MaxLength(16)
  tax_status?: string

  @IsOptional()
  @IsBoolean()
  manage_stock?: boolean

  @IsOptional()
  @IsString()
  @MaxLength(16)
  stock_status?: string

  @IsOptional()
  @IsString()
  @MaxLength(16)
  status?: string

  @IsOptional()
  @IsString()
  @MaxLength(2048)
  description?: string

  @IsOptional()
  @IsString()
  @MaxLength(16)
  sku?: string

  @IsOptional()
  @IsDecimal({ decimal_digits: '10,5' })
  sale_price?: number

  @IsOptional()
  @IsDate()
  date_on_sale_from?: Date

  @IsOptional()
  @IsDate()
  date_on_sale_to?: Date

  @IsOptional()
  @IsBoolean()
  on_sale?: boolean

  @IsOptional()
  total_sales?: number

  @IsOptional()
  stock_quantity?: number

  @IsOptional()
  @IsDecimal({ decimal_digits: '10,5' })
  weight?: number

  @IsOptional()
  @IsDecimal({ decimal_digits: '10,5' })
  length?: number

  @IsOptional()
  @IsDecimal({ decimal_digits: '10,5' })
  width?: number

  @IsOptional()
  @IsDecimal({ decimal_digits: '10,5' })
  height?: number

  @IsOptional()
  menu_order?: number
}
