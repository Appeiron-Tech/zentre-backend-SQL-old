import { IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength } from 'class-validator'

export class MPSendItemDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(4)
  id: string

  @IsNotEmpty()
  @IsString()
  @MaxLength(16)
  title: string

  @IsNotEmpty()
  @IsString()
  @MaxLength(3)
  currency_id: string

  @IsNotEmpty()
  @IsString()
  @MaxLength(512)
  picture_url: string

  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  description: string

  @IsNotEmpty()
  @IsString()
  @MaxLength(16)
  category_id: string

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  quantity: number

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  unit_price: number
}
