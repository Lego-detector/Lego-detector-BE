import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MinioClientModule } from '../minio-client';

import { DetectorController } from './controllers';
import { HistoryMapper } from './domain/mappers';
import { HistoryRepository } from './repositories';
import { History, HistorySchema } from './schemas';
import { DetectorService } from './services';
import { HistoryService } from './services/history.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: History.name, schema: HistorySchema }]),
    MinioClientModule,
  ],
  controllers: [DetectorController],
  providers: [DetectorService, HistoryService, HistoryRepository, HistoryMapper],
  exports: [HistoryService, HistoryRepository],
})
export class DetectorModule {}
