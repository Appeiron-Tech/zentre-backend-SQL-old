import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { Client } from '../entities/client.entity'

export class UpsertClientAppDto {
  client?: Client

  @IsNotEmpty()
  @IsString()
  code: string

  @IsNotEmpty()
  @IsNumber()
  plan: number

  @IsNotEmpty()
  @IsString()
  button_name: string

  @IsNotEmpty()
  @IsBoolean()
  is_enable: boolean
}
