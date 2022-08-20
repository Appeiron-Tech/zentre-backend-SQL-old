import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { IClientSN } from '../../interfaces/client-sn.interface'
import { Client } from './client.entity'

@Entity({ name: 'client_sns' })
export class ClientSN implements IClientSN {
  @PrimaryColumn({ length: 4 })
  code: string

  @Column({ length: 512, nullable: true })
  url: string

  @ManyToOne(() => Client, (client) => client.phones)
  client: Client
}
