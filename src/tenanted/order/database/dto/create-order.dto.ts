import { IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator'

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  cartId: number

  @IsNotEmpty()
  @IsString()
  address?: string

  @IsNotEmpty()
  @IsString()
  username: string

  @IsNotEmpty()
  @IsString()
  userPhone: string

  @IsNotEmpty()
  @IsNumber()
  total: number

  @IsOptional()
  @IsNumber()
  receivedMoney?: number

  @IsOptional()
  @IsNumber()
  change?: number

  @IsOptional()
  @IsNumber()
  discountPct?: number

  @IsNotEmpty()
  @IsString()
  serviceType: string

  @IsNotEmpty()
  @IsString()
  sessionId: string

  @IsOptional()
  @IsString()
  @Length(1, 8)
  paymentMethod?: string

  @IsNotEmpty()
  @IsString()
  @Length(1, 8)
  status: string

  @IsNotEmpty()
  @IsString()
  @Length(1, 8)
  paymentStatus: string

  @IsNotEmpty()
  @IsString()
  @Length(1, 8)
  deliveryStatus: string
}
