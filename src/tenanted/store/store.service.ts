import { Inject, Injectable, Scope } from '@nestjs/common'
import { asyncForEach } from 'src/utils/utils'
import { Connection, Repository } from 'typeorm'
import { TENANCY_CONNECTION } from '../../public/tenancy/tenancy.provider'
import { StoreOpeningHour } from './database/store-opening-hour.entity'
import { StorePhone } from './database/store-phone.entity'
import { StoreWorker } from './database/store-worker.entity'
import { Store } from './database/store.entity'
import { CreateStorePhoneDto } from './dto/create-store-phone.dto'
import { CreateStoreWorkerDto } from './dto/worker/create-store-worker.dto'
import { UpdStoreWorkerDto } from './dto/worker/upd-store-worker.dto'
import { UpdateStoreDto } from './dto/upd-store.dto'

@Injectable({ scope: Scope.REQUEST })
export class StoreService {
  private readonly storeRepository: Repository<Store>
  private readonly storePhoneRepository: Repository<StorePhone>
  private readonly storeWorkerRepository: Repository<StoreWorker>
  private readonly storeOpeningHourRepository: Repository<StoreOpeningHour>

  constructor(@Inject(TENANCY_CONNECTION) connection: Connection) {
    this.storeRepository = connection.getRepository(Store)
    this.storePhoneRepository = connection.getRepository(StorePhone)
    this.storeWorkerRepository = connection.getRepository(StoreWorker)
    this.storeOpeningHourRepository = connection.getRepository(StoreOpeningHour)
  }

  async findAll(): Promise<Store[]> {
    const stores = await this.storeRepository.find()
    return stores
  }

  async find(storeId?: number): Promise<Store[]> {
    if (storeId) {
      return await this.storeRepository.find({ id: storeId })
    } else {
      return await this.storeRepository.find()
    }
  }

  // async create(store: CreateStoreDto): Promise<Store> {
  //   const createdStore = await this.storeRepository.save(store)
  //   return createdStore
  // }

  async update(storeId: number, store: UpdateStoreDto): Promise<any> {
    const updatedStore = await this.storeRepository.update({ id: storeId }, { ...store })
    return updatedStore
  }

  async createPhones(storeId: number, phones: CreateStorePhoneDto[]): Promise<void> {
    await asyncForEach(phones, async (phone: StorePhone) => {
      phone.storeId = storeId
      if (!phone.isWspMain) phone.isWspMain = false
      await this.storePhoneRepository.save(phone)
    })
  }

  async dropStorePhones(storeId: number): Promise<void> {
    console.log('dropping store phones')
    await this.storePhoneRepository.delete({ storeId: storeId })
  }

  async dropStore(storeId: number): Promise<void> {
    console.log('dropping store')
    await this.storeRepository.delete({ id: storeId })
  }

  // ********************** Store Worker ********************** //
  async createWorker(storeId: number, worker: CreateStoreWorkerDto): Promise<StoreWorker> {
    worker.storeId = storeId
    const createdWorker = await this.storeWorkerRepository.save(worker)
    return createdWorker
  }

  async findAllWorkers(): Promise<StoreWorker[]> {
    const workers = await this.storeWorkerRepository
      .createQueryBuilder()
      .orderBy('storeId')
      .addOrderBy('id')
      .getMany()
    return workers
  }

  async updateWorker(workerId: number, worker: UpdStoreWorkerDto): Promise<any> {
    const updatedStore = await this.storeWorkerRepository.update({ id: workerId }, { ...worker })
    return updatedStore
  }

  async dropWorker(workerId: number): Promise<void> {
    console.log('dropping worker')
    await this.storeWorkerRepository.delete({ id: workerId })
  }

  // ********************** Opening Hours ********************** //
  async findOpeningHours(storeId?: number): Promise<StoreOpeningHour[]> {
    let openingHours = []
    if (storeId) {
      openingHours = await this.storeOpeningHourRepository.find({ storeId: storeId })
    } else {
      openingHours = await this.storeOpeningHourRepository.find()
    }
    return openingHours
  }

  async createOpeningHour(storeId: number, openingHour: any): Promise<StoreOpeningHour> {
    openingHour.storeId = storeId
    const createdOpeningHour = await this.storeOpeningHourRepository.save(openingHour)
    return createdOpeningHour
  }

  // async updateOpeningHour(
  //   openingHourId: number,
  //   openingHour: UpdStoreOpeningHourDto,
  // ): Promise<any> {
  //   const updatedOpeningHour = await this.storeOpeningHourRepository.update(
  //     { id: openingHourId },
  //     { ...openingHour },
  //   )
  //   return updatedOpeningHour
  // }

  async dropStoreOpeningHours(storeId: number, weekDay: number): Promise<void> {
    console.log('dropping opening hours for week day', weekDay)
    await this.storeOpeningHourRepository.delete({ storeId: storeId, weekDay: weekDay })
  }

  async dropAllStoreOpeningHours(storeId: number): Promise<void> {
    console.log('dropping all opening for a store')
    await this.storeOpeningHourRepository.delete({ storeId: storeId })
  }
}
