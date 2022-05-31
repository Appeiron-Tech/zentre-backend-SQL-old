import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'themes' })
export class Theme {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ unique: true, length: 32 })
  theme: string

  @Column({ length: 32 })
  brightness: string

  @Column({ length: 6 })
  primary: string

  @Column({ length: 6 })
  onPrimary: string

  @Column({ length: 6 })
  secondary: string

  @Column({ length: 6 })
  onSecondary: string

  @Column({ length: 6 })
  error: string

  @Column({ length: 6 })
  onError: string

  @Column({ length: 6 })
  background: string

  @Column({ length: 6 })
  onBackground: string

  @Column({ length: 6 })
  surface: string

  @Column({ length: 6 })
  onSurface: string
}
