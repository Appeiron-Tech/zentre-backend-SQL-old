import { Inject, Injectable, Scope } from '@nestjs/common'
import { TENANCY_CONNECTION } from 'src/public/tenancy/tenancy.provider'
import { asyncForEach } from 'src/utils/utils'
import { Connection, In, Repository } from 'typeorm'
import { CreateCategoryDto } from './database/category/dto/create-category.dto'
import { CreateProductCategoryDto } from './database/category/dto/create-product-category.dto'
import { CreateProductDto } from './database/product/dto/create-product.dto'
import { UpdateCategoryDto as UpdateVariationDto } from './database/category/dto/update-category.dto'
import { UpdateProductDto } from './database/product/dto/update-product.dto'
import { Category } from './database/category/category.entity'
import { Attribute } from './database/attribute/attribute.entity'
import { PTag } from './database/tag/p-tag.entity'
import { ProductCategory } from './database/category/product-category.entity'
import { Product } from './database/product/product.entity'
import { Variation } from './database/variation/variation.entity'
import { CrossProduct } from './database/crossProduct/cross-product.entity'
import { CreateCrossProductDto } from './database/crossProduct/dto/create-cross-product.dto'
import { ProductImage } from './database/image/product-image.entity'
import { CreateProductImageDto } from './database/image/dto/create-product-image.dto'
import { CreateAttributeDto } from './database/attribute/dto/create-attribute.dto'
import { ProductAttrOption } from './database/attribute/product-attr-option.entity'
import { CreateVariationDto } from './database/variation/dto/create-variation.dto'

@Injectable({ scope: Scope.REQUEST })
export class ProductService {
  private readonly productRepository: Repository<Product>
  private readonly productImageRepository: Repository<ProductImage>
  private readonly productCategoryRepository: Repository<ProductCategory>
  private readonly productAttrOptionRepository: Repository<ProductAttrOption>
  private readonly crossProductRepository: Repository<CrossProduct>
  private readonly categoryRepository: Repository<Category>
  private readonly attributeRepository: Repository<Attribute>
  private readonly tagRepository: Repository<PTag>
  private readonly variationRepository: Repository<Variation>

  constructor(@Inject(TENANCY_CONNECTION) connection: Connection) {
    this.productRepository = connection.getRepository(Product)
    this.productImageRepository = connection.getRepository(ProductImage)
    this.crossProductRepository = connection.getRepository(CrossProduct)
    this.productCategoryRepository = connection.getRepository(ProductCategory)
    this.productAttrOptionRepository = connection.getRepository(ProductAttrOption)
    this.categoryRepository = connection.getRepository(Category)
    this.attributeRepository = connection.getRepository(Attribute)
    this.tagRepository = connection.getRepository(PTag)
    this.variationRepository = connection.getRepository(Variation)
  }

  async findByIds(ids: number[]): Promise<Product[]> {
    if (ids && ids?.length > 0) {
      console.log('ids ' + ids)
      return await this.productRepository.find({
        where: { id: In(ids) },
      })
    }
    return []
  }

  async findByStore(storeId: number): Promise<Product[]> {
    return await this.productRepository
      .createQueryBuilder('product')
      .innerJoinAndSelect('product.productCategories', 'productCategories')
      .innerJoinAndSelect('productCategories.category', 'category')
      // .leftJoinAndSelect('product.attributeOptions', 'attributeOptions')
      // .leftJoinAndSelect('product.rawCrossProducts', 'crossProducts')
      .leftJoinAndSelect('product.rawImages', 'images')
      .leftJoinAndSelect('product.rawVariations', 'variations')
      .leftJoinAndSelect('variations.images', 'variationImages')
      .leftJoinAndSelect('variations.variationOptions', 'variationOptionsRel')
      .leftJoinAndSelect('variationOptionsRel.variationOption', 'variationOption')
      .innerJoinAndSelect(
        'product.storeProducts',
        'storeProduct',
        'storeProduct.storeId = :storeId',
        {
          storeId: storeId,
        },
      )
      .orderBy('product.id', 'ASC')
      .addOrderBy('variations.id', 'ASC')
      .getMany()
  }

  async findOne(id: number): Promise<Product> {
    return await this.productRepository.findOne(id)
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find()
  }

  async upsert(product: CreateProductDto | UpdateProductDto): Promise<Product> {
    const createdProduct = await this.productRepository.save(product)
    return createdProduct
  }

  /* *********************** CATEGORIES ********************* */
  async createCategory(category: CreateCategoryDto): Promise<Category> {
    const upsertedCategory = await this.categoryRepository.save(category)
    return upsertedCategory
  }

  async updateCategory(categoryId: number, category: UpdateVariationDto): Promise<void> {
    await this.categoryRepository.update({ id: categoryId }, { ...category })
  }

  async findCategories(ids?: number[]): Promise<Category[]> {
    if (ids && ids?.length > 0) {
      return await this.categoryRepository.find({
        where: { id: In(ids), isActive: true },
      })
    } else {
      return await this.categoryRepository.find({ isActive: true })
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
  async createCrossProducts(productId: number, crossProducts: Product[]): Promise<void> {
    await asyncForEach(crossProducts, async (crossProduct: Product) => {
      const createCrossProduct: CreateCrossProductDto = {
        productId: productId,
        crossProductId: crossProduct.id,
      }
      await this.crossProductRepository.save(createCrossProduct)
    })
  }

  /* *********************** PRODUCT IMAGES ********************* */
  async createProductImage(productId: number, productImage: CreateProductImageDto): Promise<void> {
    productImage.productId = productId
    await this.productImageRepository.save(productImage)
  }

  async dropCrossProducts(productId: number): Promise<void> {
    await this.crossProductRepository.delete({ productId: productId })
  }

  /* *********************** PRODUCT ATTRIBUTES ********************* */
  async findAttributes(ids?: number[]): Promise<Attribute[]> {
    if (ids && ids?.length > 0) {
      return await this.attributeRepository.find({
        where: { id: In(ids) },
      })
    } else {
      return await this.attributeRepository.find()
    }
  }

  async createAttribute(attribute: CreateAttributeDto): Promise<Attribute> {
    const createdAttribute = await this.attributeRepository.save(attribute)
    return createdAttribute
  }

  // async createAttributeOption(
  //   attributeId: number,
  //   option: CreateAttributeOptionDto,
  // ): Promise<AttributeOption> {
  //   const attribute = await this.attributeRepository.findOne(attributeId)
  //   option.attribute = attribute
  //   const createdOption = await this.attributeOptionRepository.save(option)
  //   return createdOption
  // }

  // async findAttributeOption(id: number): Promise<AttributeOption> {
  //   return await this.attributeOptionRepository.findOne({ id: id })
  // }

  // async dropProductAttrOption(productAttrOptionId: number): Promise<void> {
  //   await this.productAttrOptionRepository.delete({ id: productAttrOptionId })
  // }

  // async createProductAttrOption(productId: number, attrOptionId: number): Promise<void> {
  //   const createProductAttrOption: CreateProductAttrOptionDto = {
  //     productId: productId,
  //     attributeOptionId: attrOptionId,
  //   }
  //   console.log(createProductAttrOption)
  //   await this.productAttrOptionRepository.save(createProductAttrOption)
  // }

  /* *********************** VARIATION ********************* */
  async findVariationByProduct(productId: number): Promise<Variation[]> {
    return await this.variationRepository.find({ productId: productId })
  }

  async createVariation(attrOptionId: number, variation: CreateVariationDto): Promise<Variation> {
    const createdVariation = await this.variationRepository.save(variation)
    await this.productAttrOptionRepository.update(
      { id: attrOptionId },
      { variationId: createdVariation.id },
    )
    return createdVariation
  }

  async updateVariation(variationId: number, variation: UpdateVariationDto): Promise<void> {
    await this.variationRepository.update({ id: variationId }, { ...variation })
  }
}
