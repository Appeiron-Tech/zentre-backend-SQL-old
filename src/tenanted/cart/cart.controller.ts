import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor'
import { CartService } from './cart.service'
import { Cart } from './database/cart.entity'
import { CreateCartDto } from './dto/create-cart.dto'

@UseInterceptors(LoggingInterceptor)
@UsePipes(
  new ValidationPipe({
    always: true,
  }),
)
@Controller('api/cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  async findAll(): Promise<Cart[]> {
    const stores = await this.cartService.findAll()
    return stores
  }

  @Post()
  async create(@Body(new ValidationPipe()) cart: CreateCartDto): Promise<Cart> {
    const createdCart = await this.cartService.create(cart)
    return createdCart
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.cartService.delete(id)
  }
}
