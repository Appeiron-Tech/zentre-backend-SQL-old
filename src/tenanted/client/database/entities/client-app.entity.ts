import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { Client } from './client.entity'

@Entity({ name: 'client_apps' })
export class ClientApp {
  @PrimaryColumn({ length: 4 })
  code: string

  @Column({ nullable: true, default: null })
  plan: number

  @Column({ length: 16, nullable: false })
  name: string

  @Column({ nullable: false, default: false })
  enable: boolean

  @Column({ nullable: false, default: false })
  show: boolean

  @ManyToOne(() => Client, (client) => client.apps)
  client: Client
}
