import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class UpsertAppDto {
  @IsNotEmpty()
  @IsString()
  code: string

  @IsNotEmpty()
  @IsNumber()
  plan: number

  @IsOptional()
  @IsBoolean()
  show: boolean

  @IsNotEmpty()
  @IsString()
  button_name: string

  @IsNotEmpty()
  @IsBoolean()
  enable: boolean
}
