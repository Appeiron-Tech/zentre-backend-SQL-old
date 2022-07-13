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
import { Category } from './database/category/category.entity'
import { CreateCategoryDto } from './database/category/dto/create-category.dto'
import { ProductService } from './product.service'

@UseInterceptors(LoggingInterceptor)
@UsePipes(
  new ValidationPipe({
    always: true,
  }),
)
@Controller('api/category')
export class CategoryController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findCategories(): Promise<Category[]> {
    const categories = await this.productService.findCategories()
    return categories
  }

  @Post()
  async createCategory(@Body() category: CreateCategoryDto): Promise<Category> {
    const createdCategory = await this.productService.createCategory(category)
    return createdCategory
  }

  @Patch('category/:id')
  async updateCategory(
    @Param('id') categoryId: number,
    @Body() category: CreateCategoryDto,
  ): Promise<void> {
    await this.productService.updateCategory(categoryId, category)
  }
}
