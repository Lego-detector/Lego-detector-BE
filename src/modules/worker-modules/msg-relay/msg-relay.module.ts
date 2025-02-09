import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { HistoryMSGRelayService } from './history-msg-relay.service'

@Module({
  imports: [MongooseModule],
  providers: [HistoryMSGRelayService],
})
export class MSGRelayModule {}
