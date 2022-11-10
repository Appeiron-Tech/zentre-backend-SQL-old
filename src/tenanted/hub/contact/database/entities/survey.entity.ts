import { Store } from 'src/tenanted/store/database/store.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'hub_survey' })
export class HubSurvey {
  @PrimaryGeneratedColumn('increment')
  id: number

  @ManyToOne(() => Store)
  store: Store

  @Column('int', { nullable: true })
  storeId: number

  @Column({ type: 'smallint', nullable: false })
  rate: number

  @Column({ length: 256, nullable: true, default: null })
  comment: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: number
}
