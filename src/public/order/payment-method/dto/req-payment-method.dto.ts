import { IsNumber, IsOptional, IsString, Length } from 'class-validator'

export class ReqPaymentMethod {
  @IsOptional()
  @IsString()
  @Length(1, 8)
  type: string

  @IsOptional()
  @IsNumber()
  planId: number
}
