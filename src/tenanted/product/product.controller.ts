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
    const readProducts: ReadProductDto[] = []
    const products = await this.productService.findAll()
    products.forEach((product) => {
      const readProduct = plainToClass(ReadProductDto, product)
      readProduct.categories = this.getCategories(product)
      readProducts.push(readProduct)
    })
    return readProducts
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

  /*************************** CATEGORIES ************************ */
  @Get('category')
  async findCategories(): Promise<Category[]> {
    const categories = await this.productService.findCategories()
    return categories
  }

  @Post('category')
  async createCategory(@Body() category: CreateCategoryDto): Promise<Category> {
    const createdCategory = await this.productService.upsertCategory(category)
    return createdCategory
  }

  @Post(':productId/category')
  async createProductCategory(
    @Param('productId') productId: number,
    @Body() categoryIds: number[],
  ): Promise<void> {
    if (categoryIds?.length > 0) {
      const validCategories: Category[] = await this.productService.findCategories(categoryIds)
      await this.productService.dropProductCategories(productId)
      await this.productService.createProductCategories(productId, validCategories)
    }
  }

  /*************************** CROSS PRODUCTS ************************ */
  // @Post(':id/crossproducts')
  // async upsertCrossProducts(
  //   @Param('id') productId: string,
  //   @Body() crossProductIds: number[],
  // ): Promise<void> {
  //   let validProductIds = []
  //   if (crossProductIds?.length > 0) {
  //     const validProducts: Product[] = await this.productService.findAll(crossProductIds)
  //     await this.productService.dropCrossProducts(productId)
  //     await this.productService.createCrossProducts(productId, validProducts)
  //   }
  // }

  /*********************************************************************** */
  /********************** PRIVATE FUNCTIONS ****************************** */
  private getCategories(product: Product): Category[] {
    const categories = product.productCategories.map((productCategory) => productCategory.category)
    return categories
  }

  private async createCrossProducts(productId: number, crossProductIds: number[]): Promise<void> {
    if (crossProductIds?.length > 0) {
      const crossProducts = await this.productService.findAll(crossProductIds)
      await this.productService.createCrossProduct(productId, crossProducts)
    }
  }
}
