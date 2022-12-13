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
import { plainToClass } from 'class-transformer'
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor'
import { Category } from './database/category/category.entity'
import { CreateCategoryDto } from './database/category/dto/create-category.dto'
import { AppCategoryDto } from './database/category/dto/read-category.dto'
import { ProductService } from './product.service'

@UseInterceptors(LoggingInterceptor)
@UsePipes(
  new ValidationPipe({
    always: true,
  }),
)
@Controller('category')
export class CategoryController {
  constructor(private readonly productService: ProductService) {}

  @Get('app')
  async findCategories(): Promise<AppCategoryDto[]> {
    const readCategories: AppCategoryDto[] = []
    const categories = await this.productService.findCategories()
    categories.forEach((category) => {
      const readCategory = plainToClass(AppCategoryDto, category)
      readCategories.push(readCategory)
    })
    return readCategories
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
