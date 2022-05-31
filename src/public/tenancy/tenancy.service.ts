import { Injectable } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { CreateTenancyDto } from 'src/public/tenancy/dto/create-tenancy.dto'
import { ReadTenancyDto } from 'src/public/tenancy/dto/read-tenancy.dto'
import { Tenancy } from './database/tenancy.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UpdTenancyDto } from './dto/upd-tenancy.dto'

@Injectable()
export class TenancyService {
  constructor(
    @InjectRepository(Tenancy)
    private readonly tenancyRepository: Repository<Tenancy>,
  ) {}

  async findAll(): Promise<ReadTenancyDto[]> {
    const tenants = await this.tenancyRepository.find()
    return tenants.map((tenant) => plainToClass(ReadTenancyDto, tenant))
  }

  async findOne(name: string): Promise<Tenancy> {
    return await this.tenancyRepository.findOne({ name: name })
  }

  async create(tenant: CreateTenancyDto): Promise<ReadTenancyDto> {
    const createdTenant = await this.tenancyRepository.save(tenant)
    return plainToClass(ReadTenancyDto, createdTenant)
  }

  async update(id: number, tenancy: UpdTenancyDto): Promise<void> {
    await this.tenancyRepository.update({ id: id }, { ...tenancy })
  }
}
