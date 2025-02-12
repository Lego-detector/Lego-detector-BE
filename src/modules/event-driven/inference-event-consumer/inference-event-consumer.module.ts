import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DetectorModule } from 'src/modules/detector/detector.module';
import { History, HistorySchema } from 'src/modules/detector/schemas';

import { RabbitMqModule } from '../rabbit-mq/rabbit-mq.module';

import { InferenceEventConsumerListener } from './inference-event-consumer.listener';
import { InferenceEventConsumerService } from './inference-event-consumer.service';

@Module({
  imports: [
    RabbitMqModule,
    DetectorModule,
    MongooseModule.forFeature([{ name: History.name, schema: HistorySchema }]),
  ],
  providers: [InferenceEventConsumerService, InferenceEventConsumerListener],
})
export class InferenceEventConsumerModule {}
