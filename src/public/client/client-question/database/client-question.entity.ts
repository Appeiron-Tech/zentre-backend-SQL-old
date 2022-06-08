import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp } from 'typeorm'
import { ClientQuestionOption } from './client-question-option.entity'

@Entity({ name: 'client_questions' })
export class ClientQuestion {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ length: 16, nullable: false })
  questionCode: string

  @Column({ length: 64, nullable: false })
  question: string

  @Column({ length: 4, nullable: false, default: 'TXTF' })
  type: string

  @Column({ nullable: false, default: 0 })
  order: number

  @OneToMany(
    () => ClientQuestionOption,
    (clientQuestionOption) => clientQuestionOption.clientQuestion,
    { eager: true },
  )
  options?: ClientQueryOptions[]

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Timestamp
}
