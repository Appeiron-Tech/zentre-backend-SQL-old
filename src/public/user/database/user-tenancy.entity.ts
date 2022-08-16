import { Tenancy } from 'src/public/tenancy/database/tenancy.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user.entity'

@Entity({ name: 'usertenancies' })
export class UserTenancy {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('int', { nullable: false })
  userId: number

  @ManyToOne(() => User, (user) => user.userTenancies)
  user: User

  @Column('int', { nullable: false })
  tenancyId: number

  @ManyToOne(() => Tenancy, (tenancy) => tenancy.userTenancies, {
    eager: true,
  })
  tenancy: number

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: number
}
