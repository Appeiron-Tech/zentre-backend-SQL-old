import { IsNotEmpty } from 'class-validator'

export class CreateOrderDto {
  @IsNotEmpty()
  cartId: number
  address?: string
  @IsNotEmpty()
  userName: string
  @IsNotEmpty()
  userPhone: string
  @IsNotEmpty()
  total: number
  receivedMoney?: number
  change?: number
  discountPct?: number
  @IsNotEmpty()
  serviceType: string
  @IsNotEmpty()
  sessionId: number
}
