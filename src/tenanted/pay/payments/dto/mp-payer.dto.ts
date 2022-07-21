import { IsEmail, IsNotEmpty, IsObject, IsOptional, IsString, MaxLength } from 'class-validator'

export class MPPhoneDto {
  @IsOptional()
  @IsString()
  @MaxLength(2)
  area_code: string

  @IsOptional()
  @IsString()
  @MaxLength(9)
  number: string
}

export class MPIdentificationDto {
  @IsString()
  @MaxLength(3)
  type: string

  @IsString()
  @MaxLength(16)
  number: string
}

export class MPPayer {
  @IsNotEmpty()
  @IsString()
  @MaxLength(64)
  name: string

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(128)
  email: string

  @IsOptional()
  @IsObject()
  phone: MPPhoneDto

  @IsNotEmpty()
  @IsObject()
  identification: MPIdentificationDto
}
