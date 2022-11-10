import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { ReadHubContact } from './admin/dto/read-hub-contact.dto'
import { ReadHubSurvey } from './admin/dto/read-hub-survey.dto'
import { ContactService } from './contact.service'
import { CreateHubContactDto } from './database/dto/create-contact.entity'
import { CreateHubSurveyDto } from './database/dto/create-survey.dto'
import { HubContact } from './database/entities/contact.entity'
import { HubSurvey } from './database/entities/survey.entity'

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get('app/survey')
  async appFindAllSurveys(): Promise<ReadHubSurvey[]> {
    const readSurveys: ReadHubSurvey[] = []
    const surveys = await this.contactService.findAllSurveys()
    surveys.forEach((survey) => {
      const readSurvey = plainToClass(ReadHubSurvey, survey)
      readSurveys.push(readSurvey)
    })
    return readSurveys
  }

  @Post('app/survey')
  async createSurvey(@Body() survey: CreateHubSurveyDto): Promise<HubSurvey> {
    try {
      const createdSurvey = await this.contactService.createSurvey(survey)
      return createdSurvey
    } catch (err) {
      // console.error(err.driveError)
      throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get('app/contact')
  async appFindAllContacts(): Promise<ReadHubContact[]> {
    const readContacts: ReadHubContact[] = []
    const contacts = await this.contactService.findAllContacts()
    contacts.forEach((contact) => {
      const readContact = plainToClass(ReadHubContact, contact)
      readContacts.push(readContact)
    })
    return readContacts
  }

  @Post('app/contact')
  async createContact(@Body() createContact: CreateHubContactDto): Promise<HubContact> {
    try {
      const createdContact = await this.contactService.createContact(createContact)
      return createdContact
    } catch (err) {
      throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
