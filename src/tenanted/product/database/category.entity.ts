import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Product } from './product.entity'

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ length: 32, nullable: false })
  category: string

  @Column()
  description?: string

  @Column({ nullable: false, default: 0 })
  pos: number

  @Column({ nullable: false, default: false })
  isActive?: boolean

  @OneToMany(() => Product, (product) => product.category, { eager: true })
  products?: Product[]

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: number
}
