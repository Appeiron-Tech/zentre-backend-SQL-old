import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator'

export class CreateStatusLogDto {
  @IsNotEmpty()
  @IsNumber()
  orderId: number

  @IsNotEmpty()
  @IsString()
  @Length(1, 8)
  status: string
}
