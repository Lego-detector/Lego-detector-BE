import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';

import { Connection, mongo } from 'mongoose';

import { HistoryDocument } from 'src/modules/detector/schemas';
import { MinioClientService } from 'src/modules/minio-client';
import { COLLECTION_NAME } from 'src/shared';
import { MONGO_EVENT } from 'src/shared/enum';

import { InferenceEventProducerService } from '../infernce-event-producer/inference-event-producer.service';

@Injectable()
export class HistoryMSGRelayService implements OnModuleInit {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    private readonly inferenceEventProducerService: InferenceEventProducerService,
    private readonly minioClientService: MinioClientService,
  ) {}

  async onModuleInit() {
    const collection = this.connection.db.collection(COLLECTION_NAME.HISTORIES);
    const changeStream = collection.watch();

    changeStream.on('change', async change => {
      await this.eventHandler(change);
    });
  }

  async eventHandler(change: mongo.ChangeStreamDocument<mongo.BSON.Document>): Promise<void> {
    switch (change.operationType) {
      case MONGO_EVENT.INSERT:
        await this.pushInferenceSession(change.fullDocument as HistoryDocument);
        break;
      default:
        break;
    }
  }

  private async pushInferenceSession(doc: HistoryDocument) {
    const { imageUrl, ...t } = doc;
    const resource = {
      uid: t._id,
      image: (await this.minioClientService.getFileAsBuffer(imageUrl)).toString('latin1'),
    };

    await this.inferenceEventProducerService.produce(resource);
  }
}
