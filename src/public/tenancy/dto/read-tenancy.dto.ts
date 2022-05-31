import { Exclude, Expose } from 'class-transformer'
import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'

@Exclude()
export class ReadTenancyDto {
  @IsNumber()
  @Expose()
  readonly id: number

  @IsString()
  @Expose()
  readonly name: string

  @IsBoolean()
  @Expose()
  readonly isActive: boolean

  @IsOptional()
  @IsString()
  @Expose()
  readonly description?: string

  @IsOptional()
  @IsString()
  @Expose()
  readonly logo?: string

  @IsString()
  @Expose()
  readonly planACOM: string

  @IsString()
  @Expose()
  readonly planWCOM: string

  @IsNumber()
  @Expose()
  readonly createdAt: number
}
