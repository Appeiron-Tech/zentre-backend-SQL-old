import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { PayForm } from './pay-form.entity'

@Entity({ name: 'pay_form_shorts' })
export class PayFormShort {
  @PrimaryColumn({ length: 4 })
  code: string

  @Column({ length: 32, nullable: true })
  name: string

  @Column({ length: 512, nullable: true })
  image: string

  @Column({ length: 64, nullable: true })
  description: string

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 5,
    nullable: false,
    default: 0,
  })
  price: number

  @ManyToOne(() => PayForm, (payForm) => payForm.formShorts)
  payForm: PayForm

  @Column({ nullable: false, default: false })
  isActive: boolean

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: number
}
