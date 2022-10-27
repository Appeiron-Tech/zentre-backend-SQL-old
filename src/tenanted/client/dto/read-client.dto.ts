import { Exclude, Expose } from 'class-transformer'
import { ClientAnswer } from '../database/entities/client-answer.entity'
import { IClientApp } from '../interfaces/client-app.interface'
import { IClientPhone } from '../interfaces/client-phone.interface'
import { IClientSN } from '../interfaces/client-sn.interface'
import { AppReadClientPhone } from './app-read-client-phone.dto'

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
  urlIG?: string

  @Expose()
  urlFB?: string

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
  phones?: AppReadClientPhone[]

  @Expose()
  answers?: ClientAnswer[]

  @Expose()
  apps: IClientApp[]

  @Expose()
  sns: IClientSN[]
}
