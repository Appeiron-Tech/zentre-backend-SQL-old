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
import { asyncForEach } from 'src/utils/utils'
import { StoreOpeningHour } from './database/store-opening-hour.entity'
import { StoreWorker } from './database/store-worker.entity'
import { Store } from './database/store.entity'
import { CreateStoreOpeningHourDto } from './dto/create-store-opening-hour.dto'
import { CreateStoreWorkerDto } from './dto/create-store-worker.dto'
import { CreateStoreDto } from './dto/create-store.dto'
import { UpdStoreWorkerDto } from './dto/upd-store-worker.dto'
import { UpdateStoreDto } from './dto/upd-store.dto'
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
  async create(@Body(new ValidationPipe()) store: CreateStoreDto): Promise<Store> {
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

  //************** Store Workers **************** */
  @Get('/allWorkers')
  async findAllWorkers(): Promise<StoreWorker[]> {
    const workers = await this.storeService.findAllWorkers()
    return workers
  }

  @Post('/:id/worker')
  async createWorkers(
    @Body(new ValidationPipe()) worker: CreateStoreWorkerDto,
    @Param('id') storeId: number,
  ): Promise<StoreWorker> {
    return await this.storeService.createWorker(storeId, worker)
  }

  @Patch('/worker/:id')
  async updateWorker(
    @Param('id') workerId: number,
    @Body(new ValidationPipe()) worker: UpdStoreWorkerDto,
  ): Promise<void> {
    await this.storeService.updateWorker(workerId, worker)
  }

  //************** Opening Hours **************** */
  @Get('/openingHours')
  async findAllOpeningHours(): Promise<StoreOpeningHour[]> {
    const openingHours = await this.storeService.findOpeningHours()
    return openingHours
  }

  @Get('/:id/openingHours')
  async findOpeningHoursByStore(@Param('id') storeId: number): Promise<StoreOpeningHour[]> {
    const openingHours = await this.storeService.findOpeningHours(storeId)
    return openingHours
  }

  @Post('/:id/openingHour')
  async createOpeningHour(
    @Param('id') storeId: number,
    @Body(new ValidationPipe()) openingHour: CreateStoreOpeningHourDto,
  ): Promise<void> {
    await asyncForEach(openingHour.ranges, async (range: StoreOpeningHour) => {
      const createOpeningHour = {
        storeId: storeId,
        weekDay: openingHour.weekDay,
        from: range.from,
        to: range.to,
      }
      await this.storeService.createOpeningHour(storeId, createOpeningHour)
    })
  }
}
