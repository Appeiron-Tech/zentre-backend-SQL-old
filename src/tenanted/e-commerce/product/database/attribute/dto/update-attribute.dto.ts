import { IsOptional, IsBoolean, IsNumber } from 'class-validator'

export class UpdateAttributeDto {
  @IsOptional()
  @IsNumber()
  position?: number

  @IsOptional()
  @IsBoolean()
  visible?: boolean
}
