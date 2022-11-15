import { Exclude, plainToClass } from 'class-transformer'
import { Timestamp } from 'typeorm'
import { Variation } from '../variation.entity'
import { IAppReadVariation, IVariationOption, IVariationOptions } from './app-read-variation.dto'

export interface IRawVariationOptions {
  id: number
  variationId: number
  variationOptionId: number
  variationOption: {
    id: number
    variation: string
    variationOption: string
  }
}

export class IReadVariation {
  @Exclude()
  variationOptions: IRawVariationOptions[]

  variation_tuples: IVariationOption[]
  price: number
  regular_price: number
  description: string
  sku: string
  sale_price: number
  on_sale: boolean
  date_on_sale_from: Timestamp
  date_on_sale_to: Timestamp
  status: string
  tax_status: string
  manage_stock: boolean
  total_sales: number
  stock_quantity: number
  stock_status: string
  weight: number
  length: number
  width: number
  height: number
  menu_order: number
  updatedAt: Timestamp
  createdAt: Timestamp
}

export function getAppReadVariations(rawVariations: Variation[]): {
  variations: IAppReadVariation[]
  variationOptions: IVariationOptions[]
} {
  const appReadVariations = []
  const allVariationOptions = []
  if (rawVariations) {
    rawVariations.forEach((rawVariation) => {
      const readVariation = plainToClass(IAppReadVariation, rawVariation)
      if (rawVariation.variationOptions) {
        const variationTuples = []
        rawVariation.variationOptions.forEach((variation) => {
          const variationTuple = {
            variation: variation.variationOption.variation,
            option: variation.variationOption.variationOption,
          }
          variationTuples.push(variationTuple)
          allVariationOptions.push(variationTuple)
        })
        readVariation.variation_tuples = variationTuples
      }
      appReadVariations.push(readVariation)
    })
  }
  const variationOptions = getUniqueVariationOptions(allVariationOptions)
  return {
    variations: appReadVariations,
    variationOptions: variationOptions,
  }
}

export function getUniqueVariationOptions(variations: IVariationOption[]): IVariationOptions[] {
  const uniqueVariationOptions: IVariationOptions[] = []
  if (variations) {
    variations.forEach((variationOption) => {
      const existingVariation = uniqueVariationOptions.find(
        (e) => e.variation === variationOption.variation,
      )
      if (existingVariation) {
        if (!existingVariation.options.includes(variationOption.option)) {
          existingVariation.options.push(variationOption.option)
        }
      } else {
        const newVariation: IVariationOptions = {
          variation: variationOption.variation,
          options: [variationOption.option],
        }
        uniqueVariationOptions.push(newVariation)
      }
    })
  }
  return uniqueVariationOptions
}
