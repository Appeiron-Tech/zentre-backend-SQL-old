import { Exclude, Expose, plainToClass } from 'class-transformer'
import { ClientAnswer } from '../database/entities/client-answer.entity'
import { IClientApp } from '../interfaces/client-app.interface'
import { AppClientSN } from './app-client-sns.dto'

@Exclude()
export class ReadClientDto {
  @Expose()
  tenancyName: string

  @Expose()
  name: string

  @Expose()
  description?: string

  @Expose()
  logo: string

  @Expose()
  cover: string

  @Expose()
  favicon: string

  @Expose()
  currencyName?: string

  @Expose()
  currencySymbol?: string

  @Expose()
  businessType?: string

  @Expose()
  brightness?: string

  @Expose()
  primary?: string

  @Expose()
  onPrimary?: string

  @Expose()
  secondary?: string

  @Expose()
  onSecondary?: string

  @Expose()
  error?: string

  @Expose()
  onError?: string

  @Expose()
  background?: string

  @Expose()
  onBackground?: string

  @Expose()
  surface?: string

  @Expose()
  onSurface?: string

  // @Expose()
  // openingHours?: AppClientOpeningHour[]

  // @Expose()
  // phones?: AppClientPhone[]

  // @Expose()
  // address?: string

  @Expose()
  answers?: ClientAnswer[]

  @Expose()
  apps: IClientApp[]

  @Expose()
  sns: AppClientSN[]
}

export function parseAppReadSns(sns: any[]): AppClientSN[] {
  const readClientSns = []
  sns.forEach((clientSn) => {
    readClientSns.push(plainToClass(AppClientSN, clientSn))
  })
  return readClientSns
}
