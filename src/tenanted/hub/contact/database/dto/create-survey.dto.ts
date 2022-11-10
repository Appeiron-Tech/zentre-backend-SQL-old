import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator'

export class CreateHubSurveyDto {
  @IsNotEmpty()
  @IsNumber()
  storeId: number

  @IsNotEmpty()
  @IsNumber()
  rate: number

  @IsOptional()
  @MaxLength(256)
  @IsString()
  comment: string
}
