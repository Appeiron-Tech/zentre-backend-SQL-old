import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor'
import { Product } from './database/product/product.entity'
import { ProductService } from './product.service'
import { plainToClass } from 'class-transformer'
import { UpdateProductDto } from './database/product/dto/update-product.dto'
import { Category } from './database/category/category.entity'
import { ReadProductDto } from './dto/read-product.dto'
import { CreateProductImageDto } from './database/image/dto/create-product-image.dto'
import {
  AppReadProductDto,
  AppSimpleReadProductDto,
} from './database/product/dto/app-read-product.dto'
import {
  getAppReadVariations,
  getAppSimpleReadVariations,
} from './database/variation/dto/read-variation.dto'
import { AppCategoryDto } from './database/category/dto/read-category.dto'
import { parseReadProductImages } from './database/image/dto/read-product-image.dto'
import { IProductImage, ProductImage } from './database/image/product-image.entity'
import {
  IAvailableOption,
  IAvailableRelation,
  IAvailableVariation,
  IGroupByVariation,
  IVariationOption,
  IVariationOptions,
  IVariationTuple,
} from './database/variation/dto/app-read-variation.dto'

@UseInterceptors(LoggingInterceptor)
@UsePipes(new ValidationPipe({ always: true }))
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('admin')
  async findAll(): Promise<ReadProductDto[]> {
    const readProducts: ReadProductDto[] = []
    // const products = await this.productService.findAll()
    // await asyncForEach(products, async (product: Product) => {
    //   const readProduct = plainToClass(ReadProductDto, product)
    //   readProduct.categories = this.getCategories(product)
    //   readProduct.crossProducts = await this.getCrossProducts({ product: product })
    //   if(product.rawVariations){
    //     readProduct.variations = this.getVariations(product.rawVariations)
    //   }
    //   readProducts.push(readProduct)
    // })
    return readProducts
  }

  @Get('app')
  async appFindAll(@Query('storeId') storeId?: number): Promise<AppSimpleReadProductDto[]> {
    const readProducts: AppSimpleReadProductDto[] = []
    let products = []
    if (storeId) {
      products = await this.productService.findByStore(storeId)
    } else {
      products = await this.productService.findAll()
    }
    products.forEach((product: Product) => {
      const readProduct = plainToClass(AppSimpleReadProductDto, product)
      readProduct.categories = this.getCategories(product)
      const appSummaryVariations = getAppSimpleReadVariations(product.rawVariations)
      readProduct.variation_min_price = appSummaryVariations.variationMinPrice
      readProduct.variation_options = appSummaryVariations.variationOptions
      readProduct.image =
        appSummaryVariations.variationImage ?? this.getSimpleReadProductImage(product.rawImages)
      readProducts.push(readProduct)
    })
    return readProducts
  }

  @Get('app/:id')
  async find(@Param('id') id: number): Promise<AppReadProductDto> {
    const product = await this.productService.findOne(id)
    const readProduct = plainToClass(AppReadProductDto, product)
    readProduct.categories = this.getCategories(product)
    readProduct.crossProducts = await this.getCrossProducts({
      product: product,
      loadCrossProducts: true,
    })
    const appVariations = getAppReadVariations(product.rawVariations)
    const allVariationOptions = appVariations.variations.map((options) => options.variation_tuples)
    readProduct.variations = appVariations.variations
    readProduct.variation_options = appVariations.variationOptions

    readProduct.availableVariationOptions = this.getAvailableVariationOptions(
      appVariations.variationOptions,
      allVariationOptions,
    )
    readProduct.images = parseReadProductImages(product.rawImages)
    return readProduct
  }

  // @Post()
  // async create(@Body() product: CreateProductDto): Promise<Product> {
  //   const toCreateProduct: DBCreateProductDto = plainToClass(DBCreateProductDto, product)
  //   const createdProduct = await this.productService.upsert(toCreateProduct)
  //   await this.createCrossProducts(createdProduct.id, product.crossProductIds)
  //   return createdProduct
  // }

  @Patch()
  async update(@Body() product: UpdateProductDto): Promise<Product> {
    const createdProduct = await this.productService.upsert(product)
    return createdProduct
  }

  /*************************** CROSS PRODUCTS ************************ */
  // @Post(':id/crossproducts')
  // async upsertCrossProducts(
  //   @Param('id') productId: number,
  //   @Body() crossProductIds: number[],
  // ): Promise<void> {
  //   if (crossProductIds?.length > 0) {
  //     const validProducts: Product[] = await this.productService.findAll(crossProductIds)
  //     await this.productService.dropCrossProducts(productId)
  //     await this.productService.createCrossProducts(productId, validProducts)
  //   }
  // }

  /*************************** CATEGORIES ************************ */
  @Post(':id/category')
  async createProductCategory(
    @Param('id') id: number,
    @Body() categoryIds: number[],
  ): Promise<void> {
    if (categoryIds?.length > 0) {
      const validCategories: Category[] = await this.productService.findCategories(categoryIds)
      await this.productService.dropProductCategories(id)
      await this.productService.createProductCategories(id, validCategories)
    }
  }

  /*************************** ATTRIBUTES ************************ */
  // @Post(':id/attr_option')
  // async createProductAttrOption(
  //   @Param('id') productId: number,
  //   @Body() attrOption: CreateProductAttrOptionDto,
  // ): Promise<void> {
  //   console.log('attr_option', attrOption)
  //   await this.productService.createProductAttrOption(productId, attrOption.attrOptionId)
  // }

  // @Delete(':id/attr_option/:attrOptionId')
  // async deleteProductAttrOption(
  //   @Param('id') productId: number,
  //   @Param('attrOptionId') attrOptionId: number,
  // ): Promise<void> {
  //   await this.productService.dropProductAttrOption(attrOptionId)
  // }

  /*************************** IMAGES ************************ */
  @Post(':id/image')
  async upsertImages(
    @Param('id') productId: number,
    @Body() productImage: CreateProductImageDto,
  ): Promise<void> {
    //upload image
    await this.productService.createProductImage(productId, productImage)
  }

  /* =================================================================================== */
  /******************************* PRIVATE FUNCTIONS *********************************** */
  private getCategories(product: Product): AppCategoryDto[] {
    if (product.productCategories) {
      return product.productCategories.map((productCategory) =>
        plainToClass(AppCategoryDto, productCategory.category),
      )
    }
    return []
  }

  private async getCrossProducts(params: {
    product: Product
    loadCrossProducts?: boolean
  }): Promise<AppReadProductDto[] | number[]> {
    const { product, loadCrossProducts } = params
    if (product.rawCrossProducts?.length > 0) {
      const crossProductsIds = product.rawCrossProducts.map(
        (crossProduct) => crossProduct.crossProductId,
      )
      if (loadCrossProducts) {
        const crossProducts = await this.productService.findByIds(crossProductsIds)
        return crossProducts.map((crossProduct) => plainToClass(AppReadProductDto, crossProduct))
      }
      return crossProductsIds
    }
    return []
  }

  private getSimpleReadProductImage(productImages: ProductImage[]): IProductImage {
    let image: IProductImage = null
    if (productImages?.length > 0) {
      image = productImages.find(
        (productImage) => productImage.src !== null && productImage.src !== '',
      )
    }
    return image
  }

  private getOthersVariations(
    variation: string,
    option: string,
    tuple: IVariationOption[],
  ): IVariationOption[] {
    const otherVariations: IVariationOption[] = tuple.map((variationOption) => {
      if (variationOption.variation !== variation && variationOption.option !== option) {
        return {
          variation: variationOption.variation,
          option: variationOption.option,
        }
      } else {
        return {} as IVariationOption
      }
    })
    return otherVariations?.filter((variation) => variation.variation !== undefined) || []
  }

  private findRelation(
    allVariationOptions: IVariationOption[][],
    variation: string,
    option: string,
  ): IVariationOption[] {
    const foundTuples = allVariationOptions.map((tuple) => {
      const containsVariation = tuple.some(
        (vOption) => vOption.variation == variation && vOption.option == option,
      )
      if (containsVariation) {
        return this.getOthersVariations(variation, option, tuple)
      } else {
        return []
      }
    })
    const variationRelations: IVariationOption[] = []
    if (foundTuples.length) {
      foundTuples.forEach((foundTuple) => {
        if (foundTuple.length) {
          variationRelations.push(...foundTuple)
        }
      })
    }
    return variationRelations
  }

  private groupRelationsByVariation(relations: IVariationOption[]): IGroupByVariation[] {
    const groupByVariation: IGroupByVariation[] = []
    relations.forEach((relation) => {
      const existsVariation = groupByVariation.find((e) => e.variation === relation.variation)
      if (existsVariation) {
        if (!existsVariation.options.includes(relation.option)) {
          existsVariation.options.push(relation.option)
        }
      } else {
        const newVariation: IGroupByVariation = {
          variation: relation.variation,
          options: [relation.option],
        }
        groupByVariation.push(newVariation)
      }
    })
    return groupByVariation
  }

  private parseAvailableOptions(
    allOptions: string[],
    relationOptions: string[],
  ): IAvailableOption[] {
    const availableOptions: IAvailableOption[] = []
    allOptions.forEach((allOption) => {
      const availableOption: IAvailableOption = {
        label: allOption,
        value: allOption,
        disable: !relationOptions.includes(allOption),
      }
      availableOptions.push(availableOption)
    })
    return availableOptions
  }

  private getAvailableVariationOptions(
    variationOptions: IVariationOptions[],
    allVariationOptions: IVariationOption[][],
  ): IAvailableVariation[] {
    const availableVariationOptions: IAvailableVariation[] = []
    variationOptions.forEach((variationOption) => {
      variationOption.options.forEach((option) => {
        const availableRelations: IAvailableRelation[] = []
        const relations = this.findRelation(allVariationOptions, variationOption.variation, option)
        const variationRelations = this.groupRelationsByVariation(relations)
        variationRelations.forEach((variationRelation) => {
          const allOptions =
            variationOptions.find((variation) => variation.variation == variationRelation.variation)
              ?.options || []
          const availableOptions = this.parseAvailableOptions(allOptions, variationRelation.options)
          const availableRelation: IAvailableRelation = {
            variation: variationRelation.variation,
            options: availableOptions,
          }
          availableRelations.push(availableRelation)
        })
        const availableVariationOption: IAvailableVariation = {
          variation: variationOption.variation,
          option: option,
          available: availableRelations,
        }
        availableVariationOptions.push(availableVariationOption)
      })
    })
    return availableVariationOptions
  }

  // private async createCrossProducts(productId: number, crossProductIds: number[]): Promise<void> {
  //   if (crossProductIds?.length > 0) {
  //     const crossProducts = await this.productService.findAll(crossProductIds)
  //     await this.productService.createCrossProducts(productId, crossProducts)
  //   }
  // }
}
