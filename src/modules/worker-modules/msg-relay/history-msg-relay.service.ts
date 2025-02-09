import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';

import { Connection, mongo } from 'mongoose';

import { COLLECTION_NAME } from 'src/shared';
import { MONGO_EVENT } from 'src/shared/enum/cdc-event.enum';

@Injectable()
export class HistoryMSGRelayService implements OnModuleInit {
  constructor(
    @InjectConnection()
    private connection: Connection,
  ) {}

  async onModuleInit() {
    const collection = this.connection.db.collection(COLLECTION_NAME.HISTORIES);
    const changeStream = collection.watch();

    changeStream.on('change', async (change) => {
      return this.eventHandler(change);
    });
  }

  async eventHandler(
    change: mongo.ChangeStreamDocument<mongo.BSON.Document>
  ): Promise<void> {
    switch (change.operationType) {
      case MONGO_EVENT.INSERT:
        console.log(change.fullDocument);
        break;
      default:
        break;
    }
  }
}
