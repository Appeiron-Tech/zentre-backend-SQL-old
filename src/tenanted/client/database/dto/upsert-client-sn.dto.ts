import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { Client } from '../entities/client.entity'

export class UpsertClientSNDto {
  client?: Client

  @IsNotEmpty()
  @IsString()
  code: string

  @IsOptional()
  @IsString()
  url: string

  @IsOptional()
  @IsBoolean()
  show: boolean
}
