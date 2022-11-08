import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from 'typeorm'

@Entity({ name: 'announcements' })
export class Announcement {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ length: 7, nullable: true, default: null })
  screenCode?: string

  @Column({ length: 4, nullable: false })
  appCode?: string

  @Column({ length: 64, nullable: true })
  title?: string

  @Column({ length: 128, nullable: true })
  description?: string

  @Column({ length: 256, nullable: true, default: null })
  url?: string

  @Column({ length: 6, nullable: true, default: null })
  color?: string

  @Column({ length: 256, nullable: true, default: null })
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
