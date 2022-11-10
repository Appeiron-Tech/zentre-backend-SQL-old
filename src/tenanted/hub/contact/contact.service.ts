import { Inject, Injectable, Scope } from '@nestjs/common'
import { TENANCY_CONNECTION } from 'src/public/tenancy/tenancy.provider'
import { HubSurvey } from './database/entities/survey.entity'
import { Connection, Repository } from 'typeorm'
import { CreateHubSurveyDto } from './database/dto/create-survey.dto'
import { HubContact } from './database/entities/contact.entity'
import { CreateHubContactDto } from './database/dto/create-contact.entity'

@Injectable({ scope: Scope.REQUEST })
export class ContactService {
  private readonly hubSurveyRepository: Repository<HubSurvey>
  private readonly hubContactRepository: Repository<HubContact>

  constructor(@Inject(TENANCY_CONNECTION) connection: Connection) {
    this.hubSurveyRepository = connection.getRepository(HubSurvey)
    this.hubContactRepository = connection.getRepository(HubContact)
  }

  async findAllSurveys(): Promise<HubSurvey[]> {
    try {
      return await this.hubSurveyRepository.find()
    } catch (err) {
      console.error(err)
      throw new Error(err)
    }
  }

  async findAllContacts(): Promise<HubContact[]> {
    try {
      return await this.hubContactRepository.find()
    } catch (err) {
      console.error(err)
      throw new Error(err)
    }
  }

  async createSurvey(survey: CreateHubSurveyDto): Promise<HubSurvey> {
    try {
      const upsertedSurvey = await this.hubSurveyRepository.save(survey)
      return upsertedSurvey
    } catch (err) {
      console.error(err.sqlMessage || 'DB Error')
      throw err
    }
  }

  async createContact(contact: CreateHubContactDto): Promise<HubContact> {
    try {
      const upsertedContact = await this.hubContactRepository.save(contact)
      return upsertedContact
    } catch (err) {
      console.error(err.sqlMessage || 'DB Error')
      throw err
    }
  }
}
