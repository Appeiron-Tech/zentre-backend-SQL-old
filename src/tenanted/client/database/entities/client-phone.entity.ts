import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Client } from './client.entity'
import { IClientPhone } from '../../interfaces/client-phone.interface'

@Entity({ name: 'clientphones' })
export class ClientPhone implements IClientPhone {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  phone: number

  @Column()
  countryCode: number

  @Column()
  type: string

  @ManyToOne(() => Client, (client) => client.phones)
  client: number

  @Column()
  isWspMain: boolean

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: number
}
