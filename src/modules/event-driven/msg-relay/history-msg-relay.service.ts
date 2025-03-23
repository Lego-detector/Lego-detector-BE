import { Injectable, OnModuleInit } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectConnection } from '@nestjs/mongoose';

import { Connection, mongo } from 'mongoose';

import { HistoryDocument } from 'src/modules/detector/schemas';
import { COLLECTION_NAME, EVENT } from 'src/shared';

@Injectable()
export class HistoryMSGRelayService implements OnModuleInit {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async onModuleInit() {
    const collection = this.connection.db.collection(COLLECTION_NAME.HISTORIES);
    // const watchListMongoEvent = [ EVENT.MONGO.INSERT ];
    const changeStream = collection.watch(
      [
        // {
        //   $match: {
        //     // 'txnNumber': { $exists: true },
        //   },
        // },
      ],
      { fullDocument: 'whenAvailable' },
    );

    changeStream.on('change', async change => {
      await this.eventHandler(change);
    });
  }

  private async eventHandler(
    change: mongo.ChangeStreamDocument<mongo.BSON.Document>,
  ): Promise<void> {
    switch (change.operationType) {
      case EVENT.MONGO.INSERT:
        this.InsertEventHandler(change as mongo.ChangeStreamInsertDocument);
        break;
      default:
        break;
    }
  }

  private async InsertEventHandler(
    change: mongo.ChangeStreamInsertDocument<mongo.BSON.Document>,
  ): Promise<void> {
    this.eventEmitter.emit(EVENT.HISTORY.CREATE, change.fullDocument as HistoryDocument);
  }
}
