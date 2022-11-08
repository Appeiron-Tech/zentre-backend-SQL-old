import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ClientPhone } from './client-phone.entity'
import { IClient } from '../../interfaces/client.interface'
import { ClientAnswer } from './client-answer.entity'
import { ClientApp } from './client-app.entity'
import { ClientSN } from './client-sn.entity'
import { ClientOpeningHour } from './client-opening-hour.entity'

@Entity({})
export class Client implements IClient {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ nullable: false })
  tenancyId: number

  @Column({ nullable: false })
  tenancyName: string

  @Column({ nullable: false })
  name: string

  @Column({ length: 1028, nullable: true })
  description: string

  @Column({ length: 1028, nullable: true })
  address: string

  @Column({ length: 16, nullable: false })
  businessType: string

  @Column({ length: 512, nullable: true })
  logo: string

  @Column({ length: 512, nullable: true })
  cover: string

  @Column({ length: 512, nullable: true })
  favicon: string

  @Column({ length: 3, nullable: true })
  currencyName: string

  @Column({ length: 3, nullable: true })
  currencySymbol: string

  @Column()
  email_analytics: string

  @Column()
  view_id: string

  @Column({ type: 'text', nullable: true })
  api_key: string

  @Column({ length: 6, nullable: true })
  brightness: string

  @Column({ length: 6, nullable: true })
  primary: string

  @Column({ length: 6, nullable: true })
  onPrimary: string

  @Column({ length: 6, nullable: true })
  secondary: string

  @Column({ length: 6, nullable: true })
  onSecondary: string

  @Column({ length: 6, nullable: true })
  error: string

  @Column({ length: 6, nullable: true })
  onError: string

  @Column({ length: 6, nullable: true })
  background: string

  @Column({ length: 6, nullable: true })
  onBackground: string

  @Column({ length: 6, nullable: true })
  surface: string

  @Column({ length: 6, nullable: true })
  onSurface: string

  @OneToMany(() => ClientAnswer, (clientAnswer) => clientAnswer.client, {
    eager: true,
    cascade: true,
  })
  answers: ClientAnswer[]

  @OneToMany(() => ClientPhone, (phone) => phone.client, { eager: true })
  phones: ClientPhone[]

  @OneToMany(() => ClientApp, (app) => app.client, { eager: true })
  apps: ClientApp[]

  @OneToMany(() => ClientSN, (sn) => sn.client, { eager: true })
  sns: ClientSN[]

  @OneToMany(() => ClientOpeningHour, (clientOH) => clientOH.client, { eager: true })
  openingHours: ClientOpeningHour[]

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: number
}
