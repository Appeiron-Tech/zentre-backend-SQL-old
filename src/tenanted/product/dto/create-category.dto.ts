import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(32)
  category: string

  @IsOptional()
  @IsString()
  @MaxLength(256)
  description?: string

  @IsNumber()
  @IsPositive()
  pos: number

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean
}
