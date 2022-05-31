import { Exclude, Expose } from 'class-transformer'
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'

@Exclude()
export class ReadTenancyDto {
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
