import { IsNotEmpty, IsString } from 'class-validator'

export class CreateHubSnDto {
  @IsNotEmpty()
  @IsString()
  code: string

  @IsNotEmpty()
  @IsString()
  enable: boolean
}
