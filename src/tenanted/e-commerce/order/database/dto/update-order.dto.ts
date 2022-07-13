import { IsNumber, IsOptional, IsString, Length } from 'class-validator'

export class UpdateOrderDto {
  @IsOptional()
  @IsString()
  address?: string

  @IsOptional()
  @IsString()
  userPhone?: string

  @IsOptional()
  @IsNumber()
  total?: number

  @IsOptional()
  @IsNumber()
  receivedMoney?: number

  @IsOptional()
  @IsNumber()
  change?: number

  @IsOptional()
  @IsString()
  @Length(1, 8)
  paymentMethod?: string

  @IsOptional()
  @IsString()
  @Length(1, 8)
  status: string

  @IsOptional()
  @IsString()
  @Length(1, 8)
  paymentStatus: string

  @IsOptional()
  @IsString()
  @Length(1, 8)
  deliveryStatus: string
}
