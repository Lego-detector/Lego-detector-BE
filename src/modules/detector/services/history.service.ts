import { Injectable } from '@nestjs/common';

import { Types } from 'mongoose';

import { ErrorException } from '../../../common';
import { CODES, HistoryStatus, ROLE_POLICY, UserRole } from '../../../shared';
import { MinioClientService } from '../../minio-client';
import { HistoryEntity } from '../domain/entities';
import { HistoryRepository } from '../repositories';
import { BoundingBoxDocument } from '../schemas';

@Injectable()
export class HistoryService {
  constructor(
    private readonly minioClientService: MinioClientService,
    private readonly historyRepository: HistoryRepository,
  ) {}

  async getTodayHistoryNumber(userId: string): Promise<number> {
    return (await this.historyRepository.getTodayHistory(userId)).length;
  }

  async getUserCurrentHistory(userId: string, role: UserRole): Promise<HistoryEntity[]> {
    const policy = ROLE_POLICY.get(role);
    const limitation = policy.HISTORY_LIMIT;

    return this.historyRepository.getUserCurrentHistory(userId, limitation);
  }

  async findById(historyId: string): Promise<HistoryEntity> {
    const history = await this.historyRepository.findById(historyId);

    if (!history) {
      throw new ErrorException(CODES.HISTORY_NOT_FOUND);
    }

    return history;
  }

  async updateHistoryResultsById(
    historyId: string,
    results: BoundingBoxDocument[],
  ): Promise<HistoryEntity> {
    // CAUTION: Not prevent updating completed status
    const history = await this.historyRepository.findById(historyId);

    if (!history) {
      return;
    }

    history.markAsCompleted(results);

    const updateQuery = {
      ...history.toDocument(),
      $unset: { expireIndex: '' }
    }

    await this.historyRepository.findByIdAndUpdate(historyId, updateQuery);

    return history;
  }

  async create(ownerId: string, image: Express.Multer.File): Promise<HistoryEntity> {
    const imageUrl = await this.minioClientService.upload('temp', image);
    const history = new HistoryEntity({
      status: HistoryStatus.Pending,
      ownerId: new Types.ObjectId(ownerId),
      imageUrl,
    }).toDocument();

    return this.historyRepository.save(history);
  }
}
