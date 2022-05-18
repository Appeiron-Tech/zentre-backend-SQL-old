import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common'
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor'
import { StoreWorker } from './database/store-worker.entity'
import { Store } from './database/store.entity'
import { CreateStoreWorkerDto } from './dto/create-store-worker.dto'
import { CreateStoreDto } from './dto/create-store.dto'
import { UpdateStoreDto } from './dto/update-store.dto'
import { StoreService } from './store.service'

@UseInterceptors(LoggingInterceptor)
@Controller('api/store')
export class StoreController {
  constructor(private storeService: StoreService) {}

  @Get()
  async findAll(): Promise<Store[]> {
    const stores = await this.storeService.findAll()
    return stores
  }

  @Post()
  async create(
    @Body(new ValidationPipe()) store: CreateStoreDto,
  ): Promise<Store> {
    const createdStore = await this.storeService.create(store)
    if (store.phones) {
      await this.storeService.createPhones(createdStore.id, store.phones)
    }
    return createdStore
  }

  @Patch('/:id')
  async update(
    @Param('id') storeId: number,
    @Body(new ValidationPipe()) store: UpdateStoreDto,
  ): Promise<void> {
    await this.storeService.update(storeId, store)
    // if (store.phones) {
    //   await this.storeService.createPhones(createdStore.id, store.phones)
    // }
  }

  @Delete('/:id')
  async drop(@Param('id') id: number): Promise<void> {
    await this.storeService.dropStorePhones(id)
    await this.storeService.dropStore(id)
  }

  @Post('/:id/worker')
  async createWorkers(
    @Body(new ValidationPipe()) worker: CreateStoreWorkerDto,
    @Param('id') storeId: number,
  ): Promise<StoreWorker> {
    return await this.storeService.createWorker(storeId, worker)
  }
}
