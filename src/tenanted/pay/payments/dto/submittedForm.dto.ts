import { IsArray, IsNotEmpty, IsObject, IsString, MaxLength } from 'class-validator'
import { MPItemDto } from './mp-item.dto'
import { MPPayer } from './mp-payer.dto'

export class SubmittedFormDto {
  @IsNotEmpty()
  @IsArray()
  items: MPItemDto[]

  @IsNotEmpty()
  @IsObject()
  payer: MPPayer

  @IsNotEmpty()
  @IsString()
  @MaxLength(3)
  user_type: string

  @IsNotEmpty()
  @IsString()
  @MaxLength(32)
  external_reference: string
}
