import { IsNotEmpty } from 'class-validator'

export class CreateOrderStateLogDto {
  @IsNotEmpty()
  orderId: number
  @IsNotEmpty()
  orderStateId: number
}
