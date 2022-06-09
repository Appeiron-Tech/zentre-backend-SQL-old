import { IsNotEmpty, IsNumber, IsString, IsBoolean } from 'class-validator'

export class UpsertPhoneDto {
  id?: number

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
