import { Module } from '@nestjs/common';
import { InfernceResultHandlerService } from './infernce-result-handler.service';
import { InfernceResultHandlerController } from './infernce-result-handler.controller';

@Module({
  controllers: [InfernceResultHandlerController],
  providers: [InfernceResultHandlerService],
})
export class InfernceResultHandlerModule {}
