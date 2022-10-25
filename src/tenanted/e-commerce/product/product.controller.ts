import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor'
import { Product } from './database/product/product.entity'
import { CreateProductDto } from './dto/create-product.dto'
import { CreateProductDto as DBCreateProductDto } from './database/product/dto/create-product.dto'
import { ProductService } from './product.service'
import { plainToClass } from 'class-transformer'
import { UpdateProductDto } from './database/product/dto/update-product.dto'
import { Category } from './database/category/category.entity'
import { ReadProductDto } from './dto/read-product.dto'
import { asyncForEach } from 'src/utils/utils'
import { CreateProductImageDto } from './database/image/dto/create-product-image.dto'
import { CreateProductAttrOptionDto } from './dto/create-product-attr-option.dto'
import { Variation } from './database/variation/variation.entity'
import {
  IAppReadVariation,
  IVariationOption,
  IVariationOptions,
} from './database/variation/dto/app-read-variation.dto'
import { AppReadProductDto } from './dto/app-read-product.dto'

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
  async appFindAll(): Promise<AppReadProductDto[]> {
    const readProducts: AppReadProductDto[] = []
    const products = await this.productService.findAll()
    await asyncForEach(products, async (product: Product) => {
      const readProduct = plainToClass(AppReadProductDto, product)
      readProduct.categories = this.getCategories(product)
      if (product.rawVariations) {
        const appVariations = this.getAppReadVariations(product.rawVariations)
        readProduct.variations = appVariations.variations
        readProduct.variation_options = appVariations.variationOptions
      }
      readProducts.push(readProduct)
    })
    return readProducts
  }

  @Get(':id')
  async find(@Param('id') id: number): Promise<ReadProductDto> {
    const product = await this.productService.find(id)
    const readProduct = plainToClass(ReadProductDto, product)
    readProduct.categories = this.getCategories(product)
    readProduct.crossProducts = await this.getCrossProducts({
      product: product,
      loadCrossProducts: true,
    })
    return readProduct
  }

  @Post()
  async create(@Body() product: CreateProductDto): Promise<Product> {
    const toCreateProduct: DBCreateProductDto = plainToClass(DBCreateProductDto, product)
    const createdProduct = await this.productService.upsert(toCreateProduct)
    await this.createCrossProducts(createdProduct.id, product.crossProductIds)
    return createdProduct
  }

  @Patch()
  async update(@Body() product: UpdateProductDto): Promise<Product> {
    const createdProduct = await this.productService.upsert(product)
    return createdProduct
  }

  /*************************** CROSS PRODUCTS ************************ */
  @Post(':id/crossproducts')
  async upsertCrossProducts(
    @Param('id') productId: number,
    @Body() crossProductIds: number[],
  ): Promise<void> {
    if (crossProductIds?.length > 0) {
      const validProducts: Product[] = await this.productService.findAll(crossProductIds)
      await this.productService.dropCrossProducts(productId)
      await this.productService.createCrossProducts(productId, validProducts)
    }
  }

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
  @Post(':id/attr_option')
  async createProductAttrOption(
    @Param('id') productId: number,
    @Body() attrOption: CreateProductAttrOptionDto,
  ): Promise<void> {
    console.log('attr_option', attrOption)
    await this.productService.createProductAttrOption(productId, attrOption.attrOptionId)
  }

  @Delete(':id/attr_option/:attrOptionId')
  async deleteProductAttrOption(
    @Param('id') productId: number,
    @Param('attrOptionId') attrOptionId: number,
  ): Promise<void> {
    await this.productService.dropProductAttrOption(attrOptionId)
  }

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
  private getCategories(product: Product): Category[] {
    const categories = product.productCategories.map((productCategory) => productCategory.category)
    return categories
  }

  private async getCrossProducts(params: {
    product: Product
    loadCrossProducts?: boolean
  }): Promise<ReadProductDto[] | number[]> {
    const { product, loadCrossProducts } = params
    const crossProductsIds = product.rawCrossProducts.map(
      (crossProduct) => crossProduct.crossProductId,
    )
    if (loadCrossProducts) {
      const crossProducts = await this.productService.findAll(crossProductsIds)
      return crossProducts.map((crossProduct) => plainToClass(ReadProductDto, crossProduct))
    }
    return crossProductsIds
  }

  private async getAppCrossProducts(params: {
    product: Product
    loadCrossProducts?: boolean
  }): Promise<AppReadProductDto[] | number[]> {
    const { product, loadCrossProducts } = params
    const crossProductsIds = product.rawCrossProducts.map(
      (crossProduct) => crossProduct.crossProductId,
    )
    if (loadCrossProducts) {
      const crossProducts = await this.productService.findAll(crossProductsIds)
      return crossProducts.map((crossProduct) => plainToClass(AppReadProductDto, crossProduct))
    }
    return crossProductsIds
  }

  private async createCrossProducts(productId: number, crossProductIds: number[]): Promise<void> {
    if (crossProductIds?.length > 0) {
      const crossProducts = await this.productService.findAll(crossProductIds)
      await this.productService.createCrossProducts(productId, crossProducts)
    }
  }

  private getAppReadVariations(rawVariations: Variation[]): {
    variations: IAppReadVariation[]
    variationOptions: IVariationOptions[]
  } {
    const appReadVariations = []
    const allVariationOptions = []
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
    const variationOptions = this.getUniqueVariationOptions(allVariationOptions)
    return {
      variations: appReadVariations,
      variationOptions: variationOptions,
    }
  }

  private getUniqueVariationOptions(variations: IVariationOption[]): IVariationOptions[] {
    const uniqueVariationOptions: IVariationOptions[] = []
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
    return uniqueVariationOptions
  }
}
