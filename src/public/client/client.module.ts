import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ClientQuestionOption } from './client-question/database/client-question-option.entity'
import { ClientQuestion } from './client-question/database/client-question.entity'
import { ClientController } from './client.controller'
import { ClientService } from './client.service'

@Module({
  imports: [TypeOrmModule.forFeature([ClientQuestion, ClientQuestionOption])],
  controllers: [ClientController],
  providers: [ClientService],
  exports: [TypeOrmModule, ClientService],
})
export class PClientModule {}
