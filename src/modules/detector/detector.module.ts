import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MinioClientModule } from '../minio-client';
import { UserModule } from '../user/user.module';

import { DetectorController } from './controllers';
import { ClassNameMapper, HistoryMapper } from './domain/mappers';
import { HistoryRepository } from './repositories';
import { ClassNameRepository } from './repositories/className.repository';
import { ClassName, ClassNameSchema, History, HistorySchema } from './schemas';
import { DetectorService } from './services';
import { HistoryService } from './services/history.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: History.name, schema: HistorySchema },
      { name: ClassName.name, schema: ClassNameSchema }
    ]),
    MinioClientModule,
    forwardRef(() => UserModule)
  ],
  controllers: [DetectorController],
  providers: [DetectorService, HistoryService, HistoryRepository, HistoryMapper, ClassNameRepository, ClassNameMapper],
  exports: [HistoryService, HistoryRepository, DetectorService],
})
export class DetectorModule {}
