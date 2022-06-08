import { IsString, IsNotEmpty, MaxLength, IsOptional } from 'class-validator'
import { Timestamp } from 'typeorm'

export class CreateProductImageDto {
  productId?: number

  @IsNotEmpty()
  @IsString()
  @MaxLength(128)
  name: string

  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  src: string

  @IsOptional()
  @IsString()
  @MaxLength(512)
  alt?: string

  @IsOptional()
  date_created?: Timestamp

  @IsOptional()
  date_created_gmt?: Timestamp

  @IsOptional()
  date_modified?: Timestamp

  @IsOptional()
  date_modified_gmt?: Timestamp
}
