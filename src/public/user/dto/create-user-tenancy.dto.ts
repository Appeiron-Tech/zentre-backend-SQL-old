import { Exclude, Expose } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator'

@Exclude()
export class CreateUserTenancyDto {
  @IsOptional()
  @IsNumber()
  @Expose()
  userId?: number

  @IsNotEmpty()
  @IsNumber()
  @Expose()
  tenancyId: number
}
