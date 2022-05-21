import { IsBoolean, IsOptional, IsUrl, Length } from 'class-validator'

export class UpdAnnouncementDto {
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

  initAt?: number

  finishAt?: number

  @IsBoolean()
  isActive: boolean
}
