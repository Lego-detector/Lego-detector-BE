import { Module } from '@nestjs/common';

import { InferenceResultHandlerController } from './inference-result-handler.controller';
import { InferenceResultHandlerService } from './inference-result-handler.service';

@Module({
  controllers: [InferenceResultHandlerController],
  providers: [InferenceResultHandlerService],
})
export class InferenceResultHandlerModule {}
