import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MaxLength } from 'class-validator'

export class MPCreateItemDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(16)
  title: string

  @IsNotEmpty()
  @IsString()
  @MaxLength(3)
  currency_id: string

  @IsOptional()
  @IsString()
  @MaxLength(512)
  picture_url: string

  @IsOptional()
  @IsString()
  @MaxLength(256)
  description: string

  @IsNotEmpty()
  @IsString()
  @MaxLength(16)
  category_id: string

  @IsOptional()
  @IsNumber()
  @IsPositive()
  quantity: number

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  unit_price: number
}
