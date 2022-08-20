import { Controller, Get } from '@nestjs/common'
import { HubAdmRespDto } from './admin/hub-adm-resp.dto'
import { HubService } from './hub.service'

@Controller('tenant/hub/')
export class HubController {
  constructor(private hubService: HubService) {}
  // ******************************** ADMIN ******************************** //
  @Get('admin')
  async getHub(): Promise<HubAdmRespDto> {
    const client = await this.hubService.getClient()
    const hubSns = await this.hubService.getSns()
    const hubApps = await this.hubService.getApps()
    return {
      client: client,
      client_sns: hubSns,
      app_buttons: hubApps,
    }
  }
}
