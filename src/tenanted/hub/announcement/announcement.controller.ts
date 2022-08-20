import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor'
import { isEmpty } from 'src/utils/utils'
import { AnnouncementService } from './announcement.service'
import { Announcement } from './database/announcement.entity'
import { CreateAnnouncementDto } from './dto/create-announcement.dto'
import { ReqAnnouncementDto } from './dto/req-announcement.dto'
import { UpdAnnouncementDto } from './dto/upd-announcement.dto'

@UseInterceptors(LoggingInterceptor)
@UsePipes(
  new ValidationPipe({
    always: true,
  }),
)
@Controller('api/announcement')
export class AnnouncementController {
  constructor(private announcementService: AnnouncementService) {}

  @Get()
  async findAll(@Query() reqAnnouncementDto?: ReqAnnouncementDto): Promise<Announcement[]> {
    if (isEmpty(reqAnnouncementDto)) {
      return await this.announcementService.findAll()
    }
    return await this.announcementService.findBy(reqAnnouncementDto)
  }

  @Post()
  async create(
    @Body(new ValidationPipe()) announcement: CreateAnnouncementDto,
  ): Promise<Announcement> {
    const createdAnnouncement = await this.announcementService.create(announcement)
    return createdAnnouncement
  }

  @Patch('/:id')
  async update(
    @Param('id') announcementId: number,
    @Body() announcement: UpdAnnouncementDto,
  ): Promise<void> {
    await this.announcementService.update(announcementId, announcement)
  }
}
