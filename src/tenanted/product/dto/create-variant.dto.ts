import { IsNotEmpty, IsString, MinLength, MaxLength, IsOptional, IsBoolean } from 'class-validator'

export class CreateVariantDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(32)
  name: string

  @IsOptional()
  @IsString()
  @MaxLength(256)
  description?: string

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean
}
