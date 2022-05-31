import { IsString, MaxLength } from 'class-validator'

export class CreateTenancyDto {
  @IsString()
  readonly name: string

  @IsString()
  @MaxLength(256)
  readonly description: string
}
