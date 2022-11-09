import { IsArray } from 'class-validator'
import { OpeningRange } from '../database/store-opening-hour.entity'

export class UpdStoreOpeningHourDto {
  @IsArray()
  ranges: OpeningRange[]
}
