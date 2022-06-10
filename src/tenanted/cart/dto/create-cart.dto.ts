import { IsNotEmpty, IsOptional } from 'class-validator'

export class CreateCartDto {
  @IsOptional()
  comment?: string
  @IsNotEmpty()
  createdAt: number
}
