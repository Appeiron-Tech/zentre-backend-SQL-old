import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from 'typeorm'

@Entity({ name: 'announcements' })
export class Announcement {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ length: 7, nullable: true, default: null })
  screenCode?: string

  @Column({ length: 4, nullable: true, default: null })
  screenType?: string

  @Column({ length: 4, nullable: false })
  appCode?: string

  @Column({ nullable: false })
  title?: string

  @Column()
  description?: string

  @Column({ length: 128, nullable: true, default: null })
  url?: string

  @Column({ length: 128, nullable: true, default: null })
  image?: string

  @Column({ type: 'timestamp', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
  initAt?: Timestamp

  @Column({ type: 'timestamp', nullable: true })
  finishAt?: Timestamp

  @Column({ type: 'boolean', nullable: false, default: false })
  isActive: boolean

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Timestamp
}