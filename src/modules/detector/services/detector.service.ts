import { Injectable } from '@nestjs/common';

import { Types } from 'mongoose';

import { HistoryEntity } from '../domain/entities';
import { HistoryRepository } from '../repository';
import { HistoryDocument } from '../schemas';


@Injectable()
export class DetectorService {
  constructor(
    private readonly historyRepository: HistoryRepository,
  ) {}

  async createSession(): Promise<HistoryDocument> {
    const history = new HistoryEntity({
      _id: new Types.ObjectId()
    }).toDocument();

    await this.historyRepository.save(history);

    return history as HistoryDocument;
  }
}
