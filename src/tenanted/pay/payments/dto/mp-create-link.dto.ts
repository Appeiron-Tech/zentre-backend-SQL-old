import { IsNotEmpty, IsString, MaxLength, IsNumber, IsPositive, IsOptional } from 'class-validator'

export class MPCreateLinkDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(64)
  title: string

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

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  unit_price: number
}
