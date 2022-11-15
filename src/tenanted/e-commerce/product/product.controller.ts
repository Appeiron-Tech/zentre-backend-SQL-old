import {
  Body,
  Controller,
  Delete,
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
import { AppReadProductDto } from './dto/app-read-product.dto'
import { getAppReadVariations } from './database/variation/dto/read-variation.dto'
import { AppCategoryDto } from './database/category/dto/read-category.dto'
import { parseReadProductImages } from './database/image/dto/read-product-image.dto'

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
  async appFindAll(@Query('storeId') storeId?: number): Promise<AppReadProductDto[]> {
    const readProducts: AppReadProductDto[] = []
    let products = []
    if (storeId) {
      products = await this.productService.findByStore(storeId)
    } else {
      products = await this.productService.findAll()
    }
    products.forEach((product: Product) => {
      const readProduct = plainToClass(AppReadProductDto, product)
      readProduct.categories = this.getCategories(product)
      const appVariations = getAppReadVariations(product.rawVariations)
      readProduct.variations = appVariations.variations
      readProduct.variation_options = appVariations.variationOptions
      readProduct.images = parseReadProductImages(product.rawImages)
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
    readProduct.variations = appVariations.variations
    readProduct.variation_options = appVariations.variationOptions
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

  // private async createCrossProducts(productId: number, crossProductIds: number[]): Promise<void> {
  //   if (crossProductIds?.length > 0) {
  //     const crossProducts = await this.productService.findAll(crossProductIds)
  //     await this.productService.createCrossProducts(productId, crossProducts)
  //   }
  // }
}
