import { Exclude, Expose } from 'class-transformer'
import { IsArray, IsBoolean, IsNumber, IsUrl } from 'class-validator'
import { PayFormShort } from '../database/pay-form-shorts.entity'

@Exclude()
export class PayConfigurationReadDto {
  @IsNumber()
  @Expose()
  id: number

  @IsBoolean()
  @Expose()
  forPersons: boolean

  @IsBoolean()
  @Expose()
  forEnterprises: boolean

  @IsBoolean()
  @Expose()
  phone: boolean

  @IsUrl()
  @Expose()
  logo: string

  @IsUrl()
  @Expose()
  cover: string

  @IsArray()
  @Expose()
  formShorts: PayFormShort[]
}
