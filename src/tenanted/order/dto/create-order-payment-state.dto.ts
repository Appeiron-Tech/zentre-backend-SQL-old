import { IsNotEmpty } from 'class-validator'

export class CreateOrderPaymentStateDto {
  @IsNotEmpty()
  orderId: number
  @IsNotEmpty()
  paymentStateId: number
}
