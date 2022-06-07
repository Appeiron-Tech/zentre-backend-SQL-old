import { Inject, Injectable, Scope } from '@nestjs/common'
import { TENANCY_CONNECTION } from 'src/public/tenancy/tenancy.provider'
import { asyncForEach } from 'src/utils/utils'
import { Connection, In, Repository } from 'typeorm'
import { CreateCategoryDto } from './database/category/dto/create-category.dto'
import { CreateProductCategoryDto } from './database/category/dto/create-product-category.dto'
import { CreateProductDto } from './database/product/dto/create-product.dto'
import { UpdateCategoryDto } from './database/category/dto/update-category.dto'
import { UpdateProductDto } from './database/product/dto/update-product.dto'
import { Category } from './database/category/category.entity'
import { PAttribute } from './database/entities/p-attribute.entity'
import { PTag } from './database/entities/p-tag.entity'
import { ProductCategory } from './database/category/product-category.entity'
import { Product } from './database/product/product.entity'
import { Variation } from './database/entities/variation.entity'
import { CrossProduct } from './database/crossProduct/cross-product.entity'
import { CreateCrossProductDto } from './database/crossProduct/dto/create-cross-product.dto'

@Injectable({ scope: Scope.REQUEST })
export class ProductService {
  private readonly productRepository: Repository<Product>
  private readonly crossProductRepository: Repository<CrossProduct>
  private readonly categoryRepository: Repository<Category>
  private readonly productCategoryRepository: Repository<ProductCategory>
  private readonly attributeRepository: Repository<PAttribute>
  private readonly tagRepository: Repository<PTag>
  private readonly variationRepository: Repository<Variation>

  constructor(@Inject(TENANCY_CONNECTION) connection: Connection) {
    this.productRepository = connection.getRepository(Product)
    this.crossProductRepository = connection.getRepository(CrossProduct)
    this.productCategoryRepository = connection.getRepository(ProductCategory)
    this.categoryRepository = connection.getRepository(Category)
    this.attributeRepository = connection.getRepository(PAttribute)
    this.tagRepository = connection.getRepository(PTag)
    this.variationRepository = connection.getRepository(Variation)
  }

  async findAll(ids?: number[]): Promise<Product[]> {
    if (ids && ids?.length > 0) {
      console.log('ids ' + ids)
      return await this.productRepository.find({
        where: { id: In(ids) },
      })
    } else {
      return await this.productRepository.find()
      // const products = await this.productRepository.find()
      // return products.map((product) => plainToClass(ReadProductDto, product))
    }
  }

  async upsert(product: CreateProductDto | UpdateProductDto): Promise<Product> {
    const createdProduct = await this.productRepository.save(product)
    return createdProduct
  }

  /* *********************** CATEGORIES ********************* */
  async upsertCategory(category: CreateCategoryDto | UpdateCategoryDto): Promise<Category> {
    const upsertedCategory = await this.categoryRepository.save(category)
    return upsertedCategory
  }

  async findCategories(ids?: number[]): Promise<Category[]> {
    if (ids && ids?.length > 0) {
      return await this.categoryRepository.find({
        where: { id: In(ids) },
      })
    } else {
      return await this.categoryRepository.find()
    }
  }

  async dropProductCategories(productId: number): Promise<void> {
    await this.productCategoryRepository.delete({ productId: productId })
  }

  async createProductCategories(productId: number, categories: Category[]): Promise<void> {
    await asyncForEach(categories, async (category: Category) => {
      const createProductCategory: CreateProductCategoryDto = {
        productId: productId,
        categoryId: category.id,
      }
      await this.productCategoryRepository.save(createProductCategory)
    })
  }

  /* *********************** CROSS PRODUCTS ********************* */
  async createCrossProduct(productId: number, crossProducts: Product[]): Promise<void> {
    await asyncForEach(crossProducts, async (crossProduct: Product) => {
      const createCrossProduct: CreateCrossProductDto = {
        productId: productId,
        crossProductId: crossProduct.id,
      }
      await this.crossProductRepository.save(createCrossProduct)
    })
  }

  // async dropCrossProducts(productId: number): Promise<void> {
  //   await this.pro
  // }
}
