import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm'
import { Client } from './client.entity'

@Entity({ name: 'client_answers' })
export class ClientAnswer {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ length: 16, nullable: false })
  questionCode: string

  @Column({ length: 64, nullable: false })
  question: string

  @Column({ length: 16, nullable: true })
  questionOptionCode: string

  @Column({ length: 512, nullable: true })
  answer: string

  @ManyToOne(() => Client, (client) => client.answers)
  client: Client

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Timestamp
}
