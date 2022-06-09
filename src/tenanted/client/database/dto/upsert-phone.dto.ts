import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { Client } from '../entities/client.entity'

export class UpsertPhoneDto {
  client?: Client

  @IsNotEmpty()
  @IsNumber()
  phone: number

  @IsNotEmpty()
  @IsNumber()
  countryCode: number

  @IsNotEmpty()
  @IsString()
  type: string

  @IsNotEmpty()
  @IsBoolean()
  isWspMain: boolean
}
