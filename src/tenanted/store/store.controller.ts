import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  // UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor'
import { asyncForEach } from 'src/utils/utils'
import { StoreOpeningHour } from './database/store-opening-hour.entity'
import { StoreWorker } from './database/store-worker.entity'
import { CreateStoreOpeningHourDto } from './dto/create-store-opening-hour.dto'
import { CreateStoreWorkerDto } from './dto/worker/create-store-worker.dto'
import { UpdStoreWorkerDto } from './dto/worker/upd-store-worker.dto'
import { StoreService } from './store.service'
import { plainToClass } from 'class-transformer'
import { ReqUpdateStoreDto } from './dto/req-upd-store.dto'
import { UpdateStoreDto } from './dto/upd-store.dto'
import { parseAppReadOpeningHours, parseAppReadPhones, ReadStoreDto } from './dto/app/app-store.dto'
// import { JwtAuthGuard } from 'src/common/modules/auth/guards/jwt-auth.guard'

@UseInterceptors(LoggingInterceptor)
@UsePipes(
  new ValidationPipe({
    always: true,
  }),
)
@Controller('store')
export class StoreController {
  constructor(private storeService: StoreService) {}

  @Get('app')
  async appFindStore(): Promise<ReadStoreDto[]> {
    const stores = await this.storeService.find()
    const readStores = this.parseReadStores(stores)
    return readStores
  }

  @Get('app/:storeId')
  async appFindStores(@Param('storeId') storeId?: number): Promise<ReadStoreDto[]> {
    const stores = await this.storeService.find(storeId)
    const readStores = this.parseReadStores(stores)
    return readStores
  }

  // @Post()
  // async create(@Body(new ValidationPipe()) store: CreateStoreDto): Promise<Store> {
  //   const createdStore = await this.storeService.create(store)
  //   if (store.phones) {
  //     await this.storeService.createPhones(createdStore.id, store.phones)
  //   }
  //   return createdStore
  // }

  @Patch('/:id')
  async update(
    @Param('id') storeId: number,
    @Body(new ValidationPipe()) store: ReqUpdateStoreDto,
  ): Promise<void> {
    const storeToUpdate = plainToClass(UpdateStoreDto, store)
    await this.storeService.update(storeId, storeToUpdate)
    if (store.phones) {
      await this.storeService.dropStorePhones(storeId)
      await this.storeService.createPhones(storeId, store.phones)
    }
  }

  @Delete('/:id')
  async drop(@Param('id') id: number): Promise<void> {
    await this.storeService.dropStorePhones(id)
    await this.storeService.dropAllStoreOpeningHours(id)
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

  @Delete('/worker/:id')
  async dropWorker(@Param('id') id: number): Promise<void> {
    await this.storeService.dropWorker(id)
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
  async createOpeningHours(
    @Param('id') storeId: number,
    @Body(new ValidationPipe()) openingHours: CreateStoreOpeningHourDto[],
  ): Promise<void> {
    await this.storeService.dropAllStoreOpeningHours(storeId)
    await asyncForEach(openingHours, async (openingHour: CreateStoreOpeningHourDto) => {
      await this.createOpeningHour(storeId, openingHour)
    })
  }

  async createOpeningHour(storeId: number, openingHour: CreateStoreOpeningHourDto): Promise<void> {
    await asyncForEach(openingHour.ranges, async (range: StoreOpeningHour) => {
      const createOpeningHour = {
        storeId: storeId,
        weekDay: openingHour.weekDay,
        fromHour: range.fromHour,
        toHour: range.toHour,
      }
      await this.storeService.createOpeningHour(storeId, createOpeningHour)
    })
  }

  // @UseGuards(JwtAuthGuard)
  // @Patch('/:storeId/openingHour/:weekDay')
  // async updateOpeningHour(
  //   @Param('storeId') storeId: number,
  //   @Param('weekDay') weekDay: number,
  //   @Body() openingHour: UpdStoreOpeningHourDto,
  // ): Promise<void> {
  //   await this.storeService.dropStoreOpeningHours(storeId, weekDay)
  //   await asyncForEach(openingHour.ranges, async (range: StoreOpeningHour) => {
  //     const createOpeningHour = {
  //       storeId: storeId,
  //       weekDay: weekDay,
  //       from: range.from,
  //       to: range.to,
  //     }
  //     await this.storeService.createOpeningHour(storeId, createOpeningHour)
  //   })
  // }

  // ************************* PRIVATE METHODS ************************* //
  private parseReadStores(stores: ReadStoreDto[]) {
    const readStores: ReadStoreDto[] = []
    stores.forEach((store) => {
      console.info(store)
      const readStore = plainToClass(ReadStoreDto, store)
      if (store.phones) {
        readStore.phones = parseAppReadPhones(store.phones)
      }
      if (store.openingHours) {
        readStore.openingHours = parseAppReadOpeningHours(store.openingHours)
      }
      readStores.push(readStore)
    })
    return readStores
  }
}
