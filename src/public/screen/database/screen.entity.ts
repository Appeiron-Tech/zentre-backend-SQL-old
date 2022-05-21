import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity({ name: 'screens' })
export class Screen {
  @PrimaryColumn({ length: 4 })
  code: string

  @Column({ length: 4 })
  type: string

  @Column({ length: 4, nullable: false })
  appCode: string
}
