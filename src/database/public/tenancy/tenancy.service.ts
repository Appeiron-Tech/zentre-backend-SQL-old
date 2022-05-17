import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateTenancyDto } from './dto/create-tenancy.dto'
import { ReadTenancyDto } from './dto/read-tenancy.dto'
import { Tenancy } from './tenancy.entity'

@Injectable()
export class TenancyService {
  constructor(
    @InjectRepository(Tenancy)
    private readonly tenancyRepository: Repository<Tenancy>,
  ) {}

  async findAll(): Promise<ReadTenancyDto[]> {
    try {
      return await this.tenancyRepository.find()
    } catch (err) {
      throw new Error(err)
    }
  }

  async findOne(name: string): Promise<Tenancy> {
    return await this.tenancyRepository.findOne({ name: name })
  }

  async create(tenant: CreateTenancyDto): Promise<ReadTenancyDto> {
    return await this.tenancyRepository.save(tenant)
  }
}
