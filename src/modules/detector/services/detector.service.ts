import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';

import { Connection } from 'mongoose';

import { ErrorException } from '../../../common';
import { CODES, UserRole } from '../../../shared';
import { BoundingBoxDocument, HistoryDocument } from '../schemas';

import { HistoryService } from './history.service';

@Injectable()
export class DetectorService {
  constructor(
    @InjectConnection()
    private readonly mongoConnection: Connection,
    private readonly historyService: HistoryService,
  ) {}

  async getCompletedSession(sessionId: string, userId: string): Promise<HistoryDocument> {
    const history = await this.historyService.findById(sessionId);

    if (!history.isCompleted()) {
      throw new ErrorException(CODES.SESSIONS_NOT_YET_COMPLETED);
    }

    if (!history.isOwner(userId)) {
      throw new ErrorException(CODES.SESSIONS_NOT_BELONG_TO_USER);
    }

    return history.toDocument();
  }

  async createSession(
    userId: string,
    role: UserRole,
    image: Express.Multer.File,
  ): Promise<HistoryDocument> {
    const hasQuota = await this.historyService.isSessionQuotaRemain(userId, role);

    if (!hasQuota) {
      throw new ErrorException(CODES.OUT_OF_SESSION_QUOTA);
    }

    const history = await this.historyService.create(userId, image);

    history.results = undefined;

    return history.toDocument();
  }

  async markSessionAsCompleted(sessionId: string, results: BoundingBoxDocument[]): Promise<void> {
    await this.historyService.updateHistoryResultsById(sessionId, results);
  }
}
