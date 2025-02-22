import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';

import { Connection } from 'mongoose';


import { HistoryDocument } from '../schemas';

import { HistoryService } from './history.service';

@Injectable()
export class DetectorService {
  constructor(
    @InjectConnection() 
    private readonly moncoConnection: Connection,
    private readonly historyService: HistoryService
  ) {}

  async createSession(image: Express.Multer.File): Promise<HistoryDocument> {
    // check amount of user history before create history
    return (await this.historyService.create(image)).toDocument();
  }
}
