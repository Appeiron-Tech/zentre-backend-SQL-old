import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { Client } from './client.entity'

@Entity({ name: 'client_apps' })
export class ClientApp {
  @PrimaryColumn({ length: 4 })
  code: string

  @Column({ nullable: true, default: null })
  plan: number

  @Column({ nullable: false, default: false })
  enable: boolean

  @ManyToOne(() => Client, (client) => client.phones)
  client: Client
}