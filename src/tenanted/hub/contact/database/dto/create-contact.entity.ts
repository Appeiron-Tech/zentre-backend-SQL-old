import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator'

export class CreateHubContactDto {
  @IsNotEmpty()
  @IsNumber()
  storeId: number

  @IsNotEmpty()
  @MaxLength(128)
  @IsString()
  userName: string

  @IsNotEmpty()
  @IsNumber()
  contactType: number

  @IsNotEmpty()
  @MaxLength(128)
  @IsString()
  contact: string

  @IsOptional()
  @MaxLength(256)
  @IsString()
  message: string
}
