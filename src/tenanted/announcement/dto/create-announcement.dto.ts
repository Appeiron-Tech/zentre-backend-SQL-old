import { IsBoolean, IsDateString, IsOptional, IsUrl, Length } from 'class-validator'

export class CreateAnnouncementDto {
  @IsOptional()
  @Length(7, 7)
  screenCode?: string

  @IsOptional()
  @Length(4, 4)
  screenType?: string

  @IsOptional()
  @Length(4, 4)
  appCode?: string

  title?: string

  description?: string

  @IsOptional()
  @IsUrl()
  url?: string

  @IsOptional()
  @IsUrl()
  image?: string

  @IsOptional()
  @IsDateString()
  initAt?: Date

  @IsOptional()
  @IsDateString()
  finishAt?: Date

  @IsBoolean()
  isActive: boolean
}
