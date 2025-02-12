import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MinioClientModule } from 'src/modules/minio-client';

import { InferenceEventProducerModule } from '../infernce-event-producer/inference-event-producer.module';

import { HistoryMSGRelayService } from './history-msg-relay.service';

@Module({
  imports: [MongooseModule, InferenceEventProducerModule, MinioClientModule],
  providers: [HistoryMSGRelayService],
})
export class MSGRelayModule {}
