import { Injectable } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { CreateTenancyDto } from 'src/database/public/tenancy/dto/create-tenancy.dto'
import { ReadTenancyDto } from 'src/database/public/tenancy/dto/read-tenancy.dto'
import { ITenancy } from 'src/database/public/tenancy/tenancy.interface'
import { TenancyService as DBTenancyService } from 'src/database/public/tenancy/tenancy.service'

@Injectable()
export class TenancyService {
  constructor(private readonly dbTenancyRepository: DBTenancyService) {}

  async findAll(): Promise<ReadTenancyDto[]> {
    const tenants = await this.dbTenancyRepository.findAll()
    return tenants.map((tenant) => plainToClass(ReadTenancyDto, tenant))
  }

  async findOne(name: string): Promise<ITenancy> {
    return await this.dbTenancyRepository.findOne(name)
  }

  async create(tenant: CreateTenancyDto): Promise<ReadTenancyDto> {
    const createdTenant = await this.dbTenancyRepository.create(tenant)
    return plainToClass(ReadTenancyDto, createdTenant)
  }
}
