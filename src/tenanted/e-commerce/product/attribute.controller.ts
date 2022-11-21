import {
  Body,
  Controller,
  Get,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor'
import { Attribute } from './database/attribute/attribute.entity'
import { CreateAttributeDto } from './database/attribute/dto/create-attribute.dto'
import { ProductService } from './product.service'

@UseInterceptors(LoggingInterceptor)
@UsePipes(
  new ValidationPipe({
    always: true,
  }),
)
@Controller('api/attribute')
export class AttributeController {
  constructor(private readonly productService: ProductService) {}

  /*************************** ATTRIBUTES ************************ */
  @Get()
  async find(): Promise<Attribute[]> {
    const attributes = await this.productService.findAttributes()
    return attributes
  }

  @Post()
  async create(@Body() attribute: CreateAttributeDto): Promise<Attribute> {
    const createdAttribute = await this.productService.createAttribute(attribute)
    return createdAttribute
  }

  // @Post(':id/option')
  // async createOption(
  //   @Param('id') id: number,
  //   @Body() option: CreateAttributeOptionDto,
  // ): Promise<AttributeOption> {
  //   const createdOption = await this.productService.createAttributeOption(id, option)
  //   return createdOption
  // }
}
