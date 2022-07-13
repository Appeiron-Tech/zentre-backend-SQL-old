import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator'

export class CreateDeliveryStatusLogDto {
  @IsNotEmpty()
  @IsNumber()
  orderId: number

  @IsNotEmpty()
  @IsString()
  @Length(1, 8)
  deliveryStatus: string
}
