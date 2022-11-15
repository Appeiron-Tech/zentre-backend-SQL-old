import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class AppCategoryDto {
  @Expose()
  id: number

  @Expose()
  name: string
}
