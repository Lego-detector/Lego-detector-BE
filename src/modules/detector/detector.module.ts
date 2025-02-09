import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DetectorController } from './controller';
import { HistoryMapper } from './domain/mapper';
import { HistoryRepository } from './repository';
import { History, HistorySchema } from './schemas';
import { DetectorService } from './services';

@Module({
  imports: [MongooseModule.forFeature([{ name: History.name, schema: HistorySchema }])],
  controllers: [DetectorController],
  providers: [DetectorService, HistoryRepository, HistoryMapper],
})
export class DetectorModule {}
