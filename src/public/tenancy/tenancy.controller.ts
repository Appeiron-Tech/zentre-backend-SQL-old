import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'
import { CreateTenancyDto } from './dto/create-tenancy.dto'
import { ReadTenancyDto } from './dto/read-tenancy.dto'
import { UpdTenancyDto } from './dto/upd-tenancy.dto'
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

  @Patch(':id')
  async update(@Param('id') id: number, @Body() tenancy: UpdTenancyDto): Promise<void> {
    await this.tenantService.update(id, tenancy)
  }
}
