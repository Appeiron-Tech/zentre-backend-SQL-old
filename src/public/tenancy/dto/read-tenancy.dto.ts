import { Exclude, Expose } from 'class-transformer'
import { IsBoolean, IsNumber, IsString } from 'class-validator'

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

  @IsNumber()
  @Expose()
  readonly createdAt: number
}
