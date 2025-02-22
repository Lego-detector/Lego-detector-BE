import { Module } from '@nestjs/common';

import { CdcListenerService } from './cdc-listener.service';

@Module({
  providers: [CdcListenerService],
})
export class CdcListenerModule {}
