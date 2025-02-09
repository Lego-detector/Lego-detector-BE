import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CdcListenerService } from './cdc-listener.service';

@Module({
  imports: [MongooseModule],
  providers: [CdcListenerService],
})
export class CdcListenerModule {}
