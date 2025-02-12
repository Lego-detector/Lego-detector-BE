import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MinioClientModule } from 'src/modules/minio-client';

import { RabbitMqModule } from '../rabbit-mq/rabbit-mq.module';

import { InferenceEventProducerListener } from './inference-event-producer.listener';
import { InferenceEventProducerService } from './inference-event-producer.service';

@Module({
  imports: [RabbitMqModule, ConfigModule, MinioClientModule],
  providers: [InferenceEventProducerService, InferenceEventProducerListener],
  exports: [InferenceEventProducerService],
})
export class InferenceEventProducerModule {}
