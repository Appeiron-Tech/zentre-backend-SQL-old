import { Store } from 'src/tenanted/store/database/store.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'hub_contact' })
export class HubContact {
  @PrimaryGeneratedColumn('increment')
  id: number

  @ManyToOne(() => Store)
  store: Store

  @Column('int', { nullable: true })
  storeId: number

  @Column({ length: 128, nullable: false })
  userName: string

  @Column({ type: 'smallint', nullable: false })
  contactType: number

  @Column({ length: 128, nullable: false })
  contact: string

  @Column({ length: 256, nullable: true, default: null })
  message: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: number
}
