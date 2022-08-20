import { IsBoolean, IsNotEmpty, IsString } from 'class-validator'

export class CreateHubAppDto {
  @IsNotEmpty()
  @IsString()
  code: string

  @IsNotEmpty()
  @IsBoolean()
  name: boolean

  @IsNotEmpty()
  @IsString()
  enable: boolean
}
