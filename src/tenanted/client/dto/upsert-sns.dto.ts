import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator'

export class UpsertSNDto {
  @IsNotEmpty()
  @IsString()
  code: string

  @IsOptional()
  @IsUrl()
  url: string

  @IsOptional()
  @IsBoolean()
  show: boolean
}
