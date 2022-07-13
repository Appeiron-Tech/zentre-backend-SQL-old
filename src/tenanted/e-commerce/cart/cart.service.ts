import { Inject, Injectable, Scope } from '@nestjs/common'
import { TENANCY_CONNECTION } from 'src/public/tenancy/tenancy.provider'
import { Connection, Repository } from 'typeorm'
import { Cart } from './database/cart.entity'
import { CreateCartDto } from './dto/create-cart.dto'

@Injectable({ scope: Scope.REQUEST })
export class CartService {
  private readonly cartRepository: Repository<Cart>

  constructor(@Inject(TENANCY_CONNECTION) connection: Connection) {
    this.cartRepository = connection.getRepository(Cart)
  }

  async findAll(): Promise<Cart[]> {
    const stores = await this.cartRepository.find()
    return stores
  }

  async create(cart: CreateCartDto): Promise<Cart> {
    const createdCart = await this.cartRepository.save(cart)
    return createdCart
  }

  async delete(id: number): Promise<void> {
    await this.cartRepository.delete(id)
  }
}
