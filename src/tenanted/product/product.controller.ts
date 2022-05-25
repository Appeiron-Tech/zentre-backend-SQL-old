import { Controller, Get, UseInterceptors } from '@nestjs/common'
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor'
import { Category } from './database/category.entity'
import { Product } from './database/product.entity'
import { Variant } from './database/variant.entity'
import { VariantOption } from './database/variantOption.entity'
import { ProductService } from './product.service'

@UseInterceptors(LoggingInterceptor)
@Controller('api/product')
export class ProductController {
  constructor(private productService: ProductService) {}

  //* ****************************************** Products *************************************************
  @Get()
  async find(): Promise<Product[]> {
    const products = await this.productService.find()
    return products
  }

  //* ****************************************** Categories *************************************************
  @Get('/categories')
  async findCategories(): Promise<Category[]> {
    const categories = await this.productService.findCategories()
    return categories
  }

  //* ****************************************** Variant *************************************************
  @Get('/variant')
  async findVariants(): Promise<Variant[]> {
    const variants = await this.productService.findVariants()
    return variants
  }

  //* *************************************** Variant Options **********************************************
  @Get('/variantoptions')
  async findVariantOptions(): Promise<VariantOption[]> {
    const variantsOptions = await this.productService.findVariantOptions()
    return variantsOptions
  }
}
