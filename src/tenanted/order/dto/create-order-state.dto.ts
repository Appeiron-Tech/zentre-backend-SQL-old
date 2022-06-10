import { IsNotEmpty } from 'class-validator'

export class CreateOrderStateDto {
  @IsNotEmpty()
  name: string
}
