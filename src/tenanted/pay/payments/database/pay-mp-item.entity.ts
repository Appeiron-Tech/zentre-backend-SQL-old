import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp } from 'typeorm'
import { PayMPPreference } from './pay-mp-preference.entity'

@Entity({ name: 'pay_mp_items' })
export class PayMPItem {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ length: 64, nullable: false })
  title: string

  @Column({ length: 3, nullable: false, default: 'PEN' })
  currency_id: string

  @Column({ length: 512, nullable: true })
  picture_url: string

  @Column({ length: 256, nullable: true })
  description: string

  @Column({ length: 16, nullable: false, default: 'custom' })
  category_id: string

  @Column({ nullable: false, default: 1 })
  quantity: number

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 5,
    nullable: false,
    default: 0,
  })
  unit_price: number

  @Column({ nullable: false, default: 'DFLT' })
  mpPreferenceCode: string

  @ManyToOne(() => PayMPPreference)
  mpPreference: PayMPPreference

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Timestamp
}
