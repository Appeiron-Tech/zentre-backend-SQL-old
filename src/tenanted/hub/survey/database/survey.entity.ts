import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'hub_survey' })
export class HubSurvey {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ type: 'smallint', nullable: false })
  rate: number

  @Column({ length: 256, nullable: true, default: null })
  comment: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: number
}
