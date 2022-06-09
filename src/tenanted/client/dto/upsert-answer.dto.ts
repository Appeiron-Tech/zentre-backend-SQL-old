import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator'

export class UpsertAnswerDto {
  @IsOptional()
  @IsNumber()
  id?: number

  @IsOptional()
  @IsString()
  @MaxLength(16)
  questionCode?: string

  @IsOptional()
  @IsString()
  @MaxLength(64)
  question?: string

  @IsOptional()
  @IsString()
  @MaxLength(16)
  questionOptionCode?: string

  @IsOptional()
  @IsString()
  @MaxLength(512)
  answer?: string
}
