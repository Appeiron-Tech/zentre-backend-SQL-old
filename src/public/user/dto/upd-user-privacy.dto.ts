import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'

export class UpdUserPrivacyDto {
  @IsOptional()
  @IsString()
  @IsEmail()
  newEmail?: string

  @IsOptional()
  @IsString()
  @MinLength(8)
  currentPassword?: string

  @IsOptional()
  @IsString()
  @MinLength(8)
  newPassword?: string
}
