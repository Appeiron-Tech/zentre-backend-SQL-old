import { IsArray, IsNotEmpty, IsObject, IsOptional, IsString, MaxLength } from 'class-validator'
import { MPItemDto } from './mp-item.dto'
import { MPPayer } from './mp-payer.dto'
import { IMPShipment } from './interfaces/mp-preference.interface'

export class SubmittedFormDto {
  @IsNotEmpty()
  @IsArray()
  items: MPItemDto[]

  @IsNotEmpty()
  @IsObject()
  payer: MPPayer

  @IsOptional()
  @IsObject()
  shipment: IMPShipment

  @IsNotEmpty()
  @IsString()
  @MaxLength(3)
  user_type: string

  @IsOptional()
  @IsString()
  @MaxLength(16)
  coupon: string

  @IsOptional()
  @IsString()
  @MaxLength(16)
  coupon_label: string

  @IsOptional()
  @IsString()
  @MaxLength(256)
  additional_info: string
}
