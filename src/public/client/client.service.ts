import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ClientQuestion } from './client-question/database/client-question.entity'

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientQuestion)
    private readonly questionRepository: Repository<ClientQuestion>,
  ) {}

  async findAll(): Promise<ClientQuestion[]> {
    try {
      return await this.questionRepository.find()
    } catch (err) {
      throw new Error(err)
    }
  }
}
