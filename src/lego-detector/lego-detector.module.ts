import { Module } from '@nestjs/common';
import { LegoDetectorService } from './lego-detector.service';
import { LegoDetectorController } from './lego-detector.controller';

@Module({
  controllers: [LegoDetectorController],
  providers: [LegoDetectorService],
})
export class LegoDetectorModule {}
