import { Exclude, Expose } from 'class-transformer'
import { IsEmail, IsOptional } from 'class-validator'

@Exclude()
export class ReadUserDto {
  @IsEmail()
  @Expose()
  email: string

  @Expose()
  rol: string

  @Expose()
  language: string

  @IsOptional()
  @Expose()
  country?: string

  @Expose()
  userName: string

  @IsOptional()
  @Expose()
  firstName?: string

  @IsOptional()
  @Expose()
  lastName?: string

  @IsOptional()
  @Expose()
  photo?: string

  @IsOptional()
  @Expose()
  createdAt: string
}
