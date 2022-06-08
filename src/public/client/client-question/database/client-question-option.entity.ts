import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ClientQuestion } from './client-question.entity'

@Entity({ name: 'client_question_options' })
export class ClientQuestionOption {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ length: 16, nullable: false })
  optionCode: string

  @Column({ length: 64, nullable: false })
  option: string

  @ManyToOne(() => ClientQuestion, (clientQuestion) => clientQuestion.options)
  clientQuestion: number

  @Column({ nullable: false, default: 0 })
  order: number
}
