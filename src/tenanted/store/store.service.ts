import { Inject, Injectable, Scope } from '@nestjs/common'
import { asyncForEach } from 'src/utils/utils'
import { Connection, Repository } from 'typeorm'
import { TENANCY_CONNECTION } from '../../public/tenancy/tenancy.provider'
import { StoreOpeningHour } from './database/store-opening-hour.entity'
import { StorePhone } from './database/store-phone.entity'
import { StoreWorker } from './database/store-worker.entity'
import { Store } from './database/store.entity'
import { CreateStorePhoneDto } from './dto/create-store-phone.dto'
import { CreateStoreWorkerDto } from './dto/create-store-worker.dto'
import { CreateStoreDto } from './dto/create-store.dto'
import { UpdStoreWorkerDto } from './dto/upd-store-worker.dto'
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

  async create(store: CreateStoreDto): Promise<Store> {
    const createdStore = await this.storeRepository.save(store)
    return createdStore
  }

  async update(storeId: number, store: UpdateStoreDto): Promise<any> {
    console.log('update store: ' + storeId)
    console.log('with data: ' + JSON.stringify(store))
    const updatedStore = await this.storeRepository.update({ id: storeId }, { ...store })
    return updatedStore
  }

  async createPhones(storeId: number, phones: CreateStorePhoneDto[]): Promise<void> {
    await asyncForEach(phones, async (phone: StorePhone) => {
      phone.store = storeId
      await this.storePhoneRepository.save(phone)
    })
  }

  async createWorker(storeId: number, worker: CreateStoreWorkerDto): Promise<StoreWorker> {
    worker.store = storeId
    const createdWorker = await this.storeWorkerRepository.save(worker)
    return createdWorker
  }

  async dropStorePhones(storeId: number): Promise<void> {
    console.log('dropping store phones')
    await this.storePhoneRepository.delete({ store: storeId })
  }

  async dropStore(storeId: number): Promise<void> {
    console.log('dropping store')
    await this.storeRepository.delete({ id: storeId })
  }

  // ********************** Store Worker ********************** //
  async findAllWorkers(): Promise<StoreWorker[]> {
    const workers = await this.storeWorkerRepository
      .createQueryBuilder()
      .orderBy('storeId')
      .addOrderBy('id')
      .getMany()
    return workers
  }

  async updateWorker(workerId: number, worker: UpdStoreWorkerDto): Promise<any> {
    console.log('update store: ' + workerId)
    console.log('with data: ' + JSON.stringify(worker))
    const updatedStore = await this.storeWorkerRepository.update({ id: workerId }, { ...worker })
    return updatedStore
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
}
