import { IsNotEmpty } from 'class-validator'

export class CreatePaymentMethodStateDto {
  @IsNotEmpty()
  name: string
}
