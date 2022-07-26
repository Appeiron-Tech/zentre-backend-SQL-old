import { Exclude, Expose } from 'class-transformer'
import { IsArray, IsEmail, IsNotEmpty, IsOptional } from 'class-validator'
import { ReadTenancyDto } from './read-tenancy.dto'

@Exclude()
export class ReadUserDto {
  @IsEmail()
  @Expose()
  email: string

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
  tenancies?: ReadTenancyDto[]

  @IsOptional()
  @Expose()
  photo?: string
}
