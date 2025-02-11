import { Module } from '@nestjs/common';

import { RabbitMqModule } from '../rabbit-mq/rabbit-mq.module';

import { InferenceEventConsumerService } from './inference-event-consumer.service';

@Module({
  imports: [RabbitMqModule],
  providers: [InferenceEventConsumerService],
})
export class InferenceEventConsumerModule {}
