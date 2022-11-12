// import { IsArray, IsOptional, IsString, IsUrl, MaxLength } from 'class-validator'
// import { IClientPhone } from '../interfaces/client-phone.interface'
// import { UpsertAnswerDto } from './upsert-answer.dto'

// export class UpdateClientDto {
//   @IsOptional()
//   @IsString()
//   @MaxLength(1028)
//   description?: string

//   @IsOptional()
//   @IsString()
//   @MaxLength(3)
//   currencyName?: string

//   @IsOptional()
//   @IsString()
//   @MaxLength(3)
//   currencySymbol?: string

//   @IsOptional()
//   @IsString()
//   @MaxLength(1028)
//   address?: string

//   @IsOptional()
//   @MaxLength(10)
//   businessType?: string

//   @IsOptional()
//   @IsUrl()
//   @MaxLength(512)
//   urlIG?: string

//   @IsOptional()
//   @IsUrl()
//   @MaxLength(512)
//   urlFB?: string

//   @IsOptional()
//   @IsString()
//   @MaxLength(32)
//   brightness?: string

//   @IsOptional()
//   @IsString()
//   @MaxLength(6)
//   primary?: string

//   @IsOptional()
//   @IsString()
//   @MaxLength(6)
//   onPrimary?: string

//   @IsOptional()
//   @IsString()
//   @MaxLength(6)
//   secondary?: string

//   @IsOptional()
//   @IsString()
//   @MaxLength(6)
//   onSecondary?: string

//   @IsOptional()
//   @IsString()
//   @MaxLength(6)
//   error?: string

//   @IsOptional()
//   @IsString()
//   @MaxLength(6)
//   onError?: string

//   @IsOptional()
//   @IsString()
//   @MaxLength(6)
//   background?: string

//   @IsOptional()
//   @IsString()
//   @MaxLength(6)
//   onBackground?: string

//   @IsOptional()
//   @IsString()
//   @MaxLength(6)
//   surface?: string

//   @IsOptional()
//   @IsString()
//   @MaxLength(6)
//   onSurface?: string

//   @IsOptional()
//   @IsArray()
//   phones?: IClientPhone[]

//   @IsOptional()
//   @IsArray()
//   answers?: UpsertAnswerDto[]
// }
