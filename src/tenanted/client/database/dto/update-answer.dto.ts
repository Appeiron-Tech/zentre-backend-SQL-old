import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator'
import { Client } from '../entities/client.entity'

export class UpdateAnswerDto {
  client?: Client

  @IsNotEmpty()
  @IsNumber()
  id: number

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
