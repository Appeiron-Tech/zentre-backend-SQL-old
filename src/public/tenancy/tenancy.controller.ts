import { Body, Controller, Get, Post } from '@nestjs/common'
import { CreateTenancyDto } from '../../database/public/tenancy/dto/create-tenancy.dto'
import { ReadTenancyDto } from '../../database/public/tenancy/dto/read-tenancy.dto'

import { TenancyService } from '../../database/public/tenancy/tenancy.service'

@Controller('public/tenants')
export class TenancyController {
  constructor(private readonly tenantService: TenancyService) {}

  @Get()
  findAll(): Promise<ReadTenancyDto[]> {
    return this.tenantService.findAll()
  }

  @Post()
  create(@Body() tenant: CreateTenancyDto): Promise<ReadTenancyDto> {
    return this.tenantService.create(tenant)
  }
}
