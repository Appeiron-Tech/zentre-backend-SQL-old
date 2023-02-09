import { Injectable } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { CreateTenancyDto } from 'src/public/tenancy/dto/create-tenancy.dto'
import { ReadTenancyDto } from 'src/public/tenancy/dto/read-tenancy.dto'
import { Tenancy, TenancyDocument } from './database/tenancy.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UpdTenancyDto } from './dto/upd-tenancy.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

// @Injectable()
// export class TenancyService {
//   constructor(
//     @InjectRepository(Tenancy)
//     private readonly tenancyRepository: Repository<Tenancy>,
//   ) {}

//   async findAll(): Promise<ReadTenancyDto[]> {
//     const tenants = await this.tenancyRepository.find()
//     return tenants.map((tenant) => plainToClass(ReadTenancyDto, tenant))
//   }

//   async findOne(name: string): Promise<Tenancy> {
//     return await this.tenancyRepository.findOne({ name: name })
//   }

//   async create(tenant: CreateTenancyDto): Promise<ReadTenancyDto> {
//     const createdTenant = await this.tenancyRepository.save(tenant)
//     return plainToClass(ReadTenancyDto, createdTenant)
//   }

//   async update(id: number, tenancy: UpdTenancyDto): Promise<void> {
//     await this.tenancyRepository.update({ id: id }, { ...tenancy })
//   }
// }

@Injectable()
export class TenancyService {
  constructor(@InjectModel(Tenancy.name) private tenancyModel: Model<TenancyDocument>) {}

  async findAll(): Promise<Tenancy[]> | undefined {
    return await this.tenancyModel.findOne({ isActive: true })
  }

  async findOne(name: string): Promise<Tenancy> | undefined {
    return await this.tenancyModel.findOne({ name: name })
  }

  async create(tenant: CreateTenancyDto): Promise<ReadTenancyDto> {
    const tenancyCreatedModel = new this.tenancyModel(tenant)
    const tenancyCreated = await tenancyCreatedModel.save()
    return plainToClass(ReadTenancyDto, tenancyCreated)
  }

  async findOneAndUpdate(name: string, tenancy: UpdTenancyDto): Promise<Tenancy> {
    try {
      return await this.tenancyModel.findOneAndUpdate({ name: name }, { ...tenancy })
    } catch (e) {
      throw e
    }
  }
}
