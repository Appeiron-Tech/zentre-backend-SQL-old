import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { Client } from '../entities/client.entity'

export class UpsertClientSNDto {
  client?: Client

  @IsNotEmpty()
  @IsString()
  code: string

  @IsOptional()
  @IsNumber()
  url: number
}
