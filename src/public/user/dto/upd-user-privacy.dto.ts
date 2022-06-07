import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class UpdUserPrivacyDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  newEmail?: string

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  currentPassword?: string

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  newPassword?: string
}
