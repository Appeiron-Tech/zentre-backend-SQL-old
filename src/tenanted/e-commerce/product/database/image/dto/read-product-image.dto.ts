import { Exclude, Expose, plainToClass } from 'class-transformer'
import { IProductImage } from '../product-image.entity'

@Exclude()
export class AppProductImage {
  @Expose()
  id: number

  @Expose()
  src: string

  @Expose()
  name: string

  @Expose()
  alt?: string

  @Expose()
  createdAt: number
}

export function parseReadProductImages(rawImages: IProductImage[]): AppProductImage[] {
  const readProductImages = []
  if (rawImages) {
    rawImages.forEach((rawImage) => {
      const readImage = plainToClass(AppProductImage, rawImage)
      readProductImages.push(readImage)
    })
  }
  return readProductImages
}
