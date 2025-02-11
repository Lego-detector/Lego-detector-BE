import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { RabbitMqModule } from '../rabbit-mq/rabbit-mq.module';

import { InferenceEventProducerService } from './inference-event-producer.service';

@Module({
  imports: [RabbitMqModule, ConfigModule],
  providers: [InferenceEventProducerService],
  exports: [InferenceEventProducerService],
})
export class InferenceEventProducerModule {}
