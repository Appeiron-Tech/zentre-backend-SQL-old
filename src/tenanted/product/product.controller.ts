import {
  Body,
  Controller,
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
import { CreateCategoryDto } from './database/category/dto/create-category.dto'
import { ReadProductDto } from './dto/read-product.dto'
import { asyncForEach } from 'src/utils/utils'
import { CreateProductImageDto } from './database/image/dto/create-product-image.dto'
import { Attribute } from './database/attribute/attribute.entity'
import { CreateAttributeDto } from './database/attribute/dto/create-attribute.dto'

@UseInterceptors(LoggingInterceptor)
@UsePipes(
  new ValidationPipe({
    always: true,
  }),
)
@Controller('api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(): Promise<ReadProductDto[]> {
    console.log('findAll')
    const readProducts: ReadProductDto[] = []
    const products = await this.productService.findAll()
    await asyncForEach(products, async (product: Product) => {
      const readProduct = plainToClass(ReadProductDto, product)
      readProduct.categories = this.getCategories(product)
      readProduct.crossProducts = await this.getCrossProducts({ product: product })
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
    @Param('productId') id: number,
    @Body() categoryIds: number[],
  ): Promise<void> {
    if (categoryIds?.length > 0) {
      const validCategories: Category[] = await this.productService.findCategories(categoryIds)
      await this.productService.dropProductCategories(id)
      await this.productService.createProductCategories(id, validCategories)
    }
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

  private async createCrossProducts(productId: number, crossProductIds: number[]): Promise<void> {
    if (crossProductIds?.length > 0) {
      const crossProducts = await this.productService.findAll(crossProductIds)
      await this.productService.createCrossProducts(productId, crossProducts)
    }
  }
}
