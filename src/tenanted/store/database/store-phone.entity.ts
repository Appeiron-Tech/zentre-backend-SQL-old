import { PHONE_TYPES } from 'src/tenanted/common/classTypes'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Store } from './store.entity'

@Entity({ name: 'storephones' })
export class StorePhone {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  phone: number

  @Column()
  countryCode: number

  @Column({ enum: PHONE_TYPES })
  type: string

  @ManyToOne(() => Store, (store) => store.phones)
  store: number

  @Column()
  isWspMain: boolean

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: number
}
