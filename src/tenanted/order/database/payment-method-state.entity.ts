import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'payment-method_states' })
export class PaymentMethodState {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ nullable: false, length: 32 })
  name: string
}
