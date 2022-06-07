import { IsString, MaxLength, IsOptional, IsBoolean } from 'class-validator'

export class UpdateCategoryDto {
  @IsString()
  @IsOptional()
  @MaxLength(64)
  name?: string

  @IsOptional()
  @IsString()
  @MaxLength(64)
  slug?: string

  @IsOptional()
  @IsString()
  @MaxLength(128)
  description?: string

  @IsOptional()
  @IsBoolean()
  isActive?: boolean
}
