import { Inject, Injectable, Scope } from '@nestjs/common'
import { TENANCY_CONNECTION } from 'src/public/tenancy/tenancy.provider'
import { Connection, Repository } from 'typeorm'
import { Category } from './database/category.entity'
import { Product } from './database/product.entity'
import { Variant } from './database/variant.entity'
import { VariantOption } from './database/variantOption.entity'

@Injectable({ scope: Scope.REQUEST })
export class ProductService {
  private readonly productRepository: Repository<Product>
  private readonly categoryRepository: Repository<Category>
  private readonly variantRepository: Repository<Variant>
  private readonly variantOptionRepository: Repository<VariantOption>

  constructor(@Inject(TENANCY_CONNECTION) connection: Connection) {
    this.productRepository = connection.getRepository(Product)
    this.categoryRepository = connection.getRepository(Category)
    this.variantRepository = connection.getRepository(Variant)
    this.variantOptionRepository = connection.getRepository(VariantOption)
  }

  //* ****************************************** Products *************************************************
  async find(): Promise<Product[]> {
    const products = await this.productRepository.find()
    return products
  }

  //* ****************************************** Categories *************************************************
  async findCategories(): Promise<Category[]> {
    const categories = await this.categoryRepository.find()
    return categories
  }

  //* ****************************************** Variant *************************************************
  async findVariants(): Promise<Variant[]> {
    const variants = await this.variantRepository.find()
    return variants
  }

  //* *************************************** Variant Options **********************************************
  async findVariantOptions(): Promise<VariantOption[]> {
    const variantsOptions = await this.variantOptionRepository.find()
    return variantsOptions
  }
}
