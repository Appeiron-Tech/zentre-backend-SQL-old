import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Client } from './client.entity'

@Entity({ name: 'client_opening_hours' })
export class ClientOpeningHour {
  @PrimaryGeneratedColumn('increment')
  id: number

  // @Column('int', { nullable: true })
  // clientId: number

  @ManyToOne(() => Client, (client) => client.openingHours)
  client: Client

  @Column('int', { nullable: false })
  weekDay: number

  @Column({ length: 5, nullable: false })
  fromHour: string

  @Column({ length: 5, nullable: false })
  toHour: string
}

export interface OpeningRange {
  fromHour: string
  toHour: string
}
