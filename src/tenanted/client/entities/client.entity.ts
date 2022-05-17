import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ClientPhone } from './client-phone.entity'
import { IClient } from '../interfaces/client.interface'

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

  @Column()
  description: string

  @Column({ nullable: false })
  businessType: string

  @Column()
  logo: string

  @Column()
  cover: string

  @Column()
  favicon: string

  @Column()
  currencyName: string

  @Column()
  currencySymbol: string

  @Column()
  urlIG: string

  @Column()
  urlFB: string

  @Column()
  brightness: string

  @Column()
  primary: string

  @Column()
  onPrimary: string

  @Column()
  secondary: string

  @Column()
  onSecondary: string

  @Column()
  error: string

  @Column()
  onError: string

  @Column()
  background: string

  @Column()
  onBackground: string

  @Column()
  surface: string

  @Column()
  onSurface: string

  @OneToMany(() => ClientPhone, (phone) => phone.client)
  phones: ClientPhone[]

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: number
}
