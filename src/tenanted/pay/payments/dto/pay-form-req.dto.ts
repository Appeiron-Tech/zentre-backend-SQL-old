import { IsBoolean, IsString, IsOptional } from 'class-validator'

export class PayFormReq {
  @IsOptional()
  @IsBoolean()
  forPersons: boolean

  @IsOptional()
  @IsBoolean()
  forEnterprises: boolean

  @IsOptional()
  @IsBoolean()
  phone: boolean

  @IsOptional()
  @IsString()
  client_name: string

  @IsOptional()
  @IsString()
  client_description: string
}
