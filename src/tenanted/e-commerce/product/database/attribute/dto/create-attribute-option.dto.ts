import { IsString, IsNotEmpty, MaxLength } from 'class-validator'
import { Attribute } from '../attribute.entity'

export class CreateAttributeOptionDto {
  attribute: Attribute

  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  name: string
}
