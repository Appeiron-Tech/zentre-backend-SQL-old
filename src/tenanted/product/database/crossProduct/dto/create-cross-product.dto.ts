import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreateCrossProductDto {
  @IsNumber()
  @IsNotEmpty()
  productId: number

  @IsNumber()
  @IsNotEmpty()
  crossProductId: number
}
