import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { Store } from 'src/tenanted/store/database/store.entity'

export class UpsertStorePhoneDto {
  store?: Store

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
