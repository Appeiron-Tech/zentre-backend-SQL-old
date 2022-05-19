import { IsArray, IsInt, Max, Min } from 'class-validator'
import { OpeningRange } from '../database/store-opening-hour.entity'

export class CreateStoreOpeningHourDto {
  @IsInt()
  @Min(0)
  @Max(6)
  weekDay: number

  @IsArray()
  ranges: OpeningRange[]
}
