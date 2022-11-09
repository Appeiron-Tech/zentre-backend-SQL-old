import { Exclude, Expose, plainToClass } from 'class-transformer'
import { ClientAnswer } from '../database/entities/client-answer.entity'
import { IClientApp } from '../interfaces/client-app.interface'
import { AppClientOpeningHour } from './app-client-opening-hour.dto'
import { AppClientPhone } from './app-client-phone.dto'
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
  address?: string

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

  @Expose()
  phones?: AppClientPhone[]

  @Expose()
  openingHours?: AppClientOpeningHour[]

  @Expose()
  answers?: ClientAnswer[]

  @Expose()
  apps: IClientApp[]

  @Expose()
  sns: AppClientSN[]
}

export function parseAppReadPhones(phones: any[]): AppClientPhone[] {
  const readClientPhones = []
  phones.forEach((clientPhone) => {
    readClientPhones.push(plainToClass(AppClientPhone, clientPhone))
  })
  return readClientPhones
}

export function parseAppReadSns(sns: any[]): AppClientSN[] {
  const readClientSns = []
  sns.forEach((clientSn) => {
    readClientSns.push(plainToClass(AppClientSN, clientSn))
  })
  return readClientSns
}

export function parseAppReadOpeningHours(openingHours: any[]): AppClientOpeningHour[] {
  const readOpeningHours = []
  openingHours.forEach((openingHour) => {
    readOpeningHours.push(plainToClass(AppClientOpeningHour, openingHour))
  })
  return readOpeningHours
}
