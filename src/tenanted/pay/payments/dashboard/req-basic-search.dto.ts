import { IsNotEmpty, IsNumberString } from 'class-validator'

export class ReqBasicSearchDTO {
  @IsNotEmpty()
  @IsNumberString()
  min_date: number
}
