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
import { CreateVariationDto } from './database/variation/dto/create-variation.dto'
import { UpdateVariationDto } from './database/variation/dto/update-variation.dto'
import { Variation } from './database/variation/variation.entity'
import { ProductService } from './product.service'

@UseInterceptors(LoggingInterceptor)
@UsePipes(
  new ValidationPipe({
    always: true,
  }),
)
@Controller('api/variation')
export class VariationController {
  constructor(private readonly productService: ProductService) {}

  @Get('byproduct/:id')
  async find(@Param('id') productId: number): Promise<Variation[]> {
    const variations = await this.productService.findVariationByProduct(productId)
    return variations
  }

  @Post(':attrOptionId')
  async create(
    @Param('attrOptionId') attrOptionId: number,
    @Body() variation: CreateVariationDto,
  ): Promise<Variation> {
    const createdVariation = await this.productService.createVariation(attrOptionId, variation)
    return createdVariation
  }

  @Patch(':id')
  async updateVariation(
    @Param('id') id: number,
    @Body() variation: UpdateVariationDto,
  ): Promise<void> {
    await this.productService.updateVariation(id, variation)
  }
}
