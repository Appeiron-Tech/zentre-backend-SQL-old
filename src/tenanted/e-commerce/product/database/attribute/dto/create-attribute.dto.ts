import { IsString, IsNotEmpty, MaxLength, IsOptional, IsBoolean, IsNumber } from 'class-validator'

export class CreateAttributeDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  name: string

  @IsOptional()
  @IsNumber()
  position?: number

  @IsOptional()
  @IsBoolean()
  visible?: boolean

  @IsOptional()
  @IsBoolean()
  variation?: boolean
}
