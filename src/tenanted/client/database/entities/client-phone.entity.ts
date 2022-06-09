import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Client } from './client.entity'
import { IClientPhone } from '../../interfaces/client-phone.interface'

@Entity({ name: 'client_phones' })
export class ClientPhone implements IClientPhone {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ nullable: false })
  phone: number

  @Column({ nullable: false })
  countryCode: number

  @Column({ nullable: false, length: 4 })
  type: string

  @ManyToOne(() => Client, (client) => client.phones)
  client: Client

  @Column({ nullable: false, default: false })
  isWspMain: boolean

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: number
}
