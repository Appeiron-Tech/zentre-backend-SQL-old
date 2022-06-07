import { IsNotEmpty } from 'class-validator'

export class CreateStoreDto {
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
  serviceType: number
  @IsNotEmpty()
  sessionId: number
  @IsNotEmpty()
  createdAt: number
}
