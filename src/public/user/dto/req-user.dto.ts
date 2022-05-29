import { IsOptional, IsString } from 'class-validator'

export class ReqUserDto {
  @IsOptional()
  @IsString()
  userName?: string

  @IsOptional()
  @IsString()
  email?: string

  @IsOptional()
  @IsString()
  rol?: string
}
