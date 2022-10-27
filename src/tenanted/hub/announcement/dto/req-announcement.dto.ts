import { Transform } from 'class-transformer'
import { IsBoolean, IsOptional } from 'class-validator'

export class ReqAnnouncementDto {
  screenCode?: string
  appCode?: string

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true
    if (value === 'false') return false
    return value
  })
  onTime?: boolean

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true
    if (value === 'false') return false
    return value
  })
  isActive?: boolean
}
