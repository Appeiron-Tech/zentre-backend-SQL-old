import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity({ name: 'hub_apps' })
export class HubApp {
  @PrimaryColumn({ length: 4 })
  code: string

  @Column({ nullable: true, default: null })
  name: string

  @Column({ nullable: false, default: false })
  enable: boolean

  @Column({ nullable: false, default: false })
  is_active: boolean
}
