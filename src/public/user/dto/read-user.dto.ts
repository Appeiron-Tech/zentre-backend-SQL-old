import { Exclude, Expose } from 'class-transformer'
import { IsEmail, IsOptional } from 'class-validator'
import { ReadTenancyDto } from './read-tenancy.dto'

@Exclude()
export class ReadUserDto {
  @IsEmail()
  @Expose()
  email: string

  @IsEmail()
  @Expose()
  password: string

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
  photoUrl?: string
}
