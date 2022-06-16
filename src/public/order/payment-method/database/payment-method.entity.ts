import { Plan } from 'src/public/app/database/plan.entity'
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'

@Entity({ name: 'payment_methods' })
export class PaymentMethod {
  @PrimaryColumn({ nullable: false, length: 8 })
  code: string

  @Column({ nullable: false, length: 32 })
  name: string

  @Column({ nullable: false, length: 8 })
  serviceType: string

  @Column('int', { nullable: false })
  planId: number

  @ManyToOne(() => Plan)
  plan: Plan
}
