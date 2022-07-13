import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator'

export class CreatePaymentStatusLogDto {
  @IsNotEmpty()
  @IsNumber()
  orderId: number

  @IsNotEmpty()
  @IsString()
  @Length(1, 8)
  paymentStatus: string
}
