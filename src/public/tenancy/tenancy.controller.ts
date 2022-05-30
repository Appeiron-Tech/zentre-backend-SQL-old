import { Body, Controller, Get, Post } from '@nestjs/common'
import { CreateTenancyDto } from './dto/create-tenancy.dto'
import { ReadTenancyDto } from './dto/read-tenancy.dto'
import { TenancyService } from './tenancy.service'

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
