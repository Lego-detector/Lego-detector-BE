import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MinioClientModule } from '../minio-client';

import { DetectorController } from './controller';
import { HistoryMapper } from './domain/mapper';
import { HistoryRepository } from './repository';
import { History, HistorySchema } from './schemas';
import { DetectorService } from './services';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: History.name, schema: HistorySchema }]),
    MinioClientModule,
  ],
  controllers: [DetectorController],
  providers: [DetectorService, HistoryRepository, HistoryMapper],
  exports: [HistoryRepository],
})
export class DetectorModule {}
