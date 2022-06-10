import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreateProductAttrOptionDto {
  @IsNotEmpty()
  @IsNumber()
  attrOptionId: number
}
