import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';

import { Connection, mongo } from 'mongoose';

import { COLLECTION_NAME } from 'src/shared';

@Injectable()
export class CdcListenerService implements OnModuleInit {
  db: mongo.Db;

  constructor(
    @InjectConnection()
    private connection: Connection,
  ) {
    this.db = connection.db;
  }

  async onModuleInit() {
    const collection = this.db.collection(COLLECTION_NAME.HISTORIES);
    const changeStream = collection.watch();

    changeStream.on('change', async change => {
      console.log('Change detected:', change);

      // Add change to the Bull queue for processing
      console.log(change);
    });
  }
}
