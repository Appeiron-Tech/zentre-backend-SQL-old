import { Exclude, Expose } from 'class-transformer'
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator'

@Exclude()
export class CreateUserDto {
  @IsNotEmpty()
  @MaxLength(64)
  @IsString()
  @Expose()
  readonly userName: string

  @IsNotEmpty()
  @MaxLength(64)
  @IsEmail()
  @Expose()
  readonly email: string

  @IsNotEmpty()
  @MaxLength(16)
  @IsString()
  @Expose()
  readonly rol: string

  @IsNotEmpty()
  @MaxLength(2)
  @MinLength(2)
  @IsString()
  @Expose()
  readonly language: string

  @IsOptional()
  @MaxLength(3)
  @MinLength(3)
  @IsString()
  @Expose()
  readonly country: string

  @IsOptional()
  @MaxLength(64)
  @IsString()
  @Expose()
  readonly firstName?: string

  @IsOptional()
  @MaxLength(128)
  @IsString()
  @Expose()
  readonly lastName?: string

  @IsOptional()
  @IsString()
  @Expose()
  password: string

  @IsOptional()
  @IsUrl()
  @Expose()
  readonly photo?: string
}
