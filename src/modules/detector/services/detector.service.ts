import { Injectable } from '@nestjs/common';

import { MinioClientService } from 'src/modules/minio-client';
import { HistoryStatus } from 'src/shared';

import { HistoryRepository } from '../repository';
import { HistoryDocument } from '../schemas';

@Injectable()
export class DetectorService {
  constructor(
    private readonly historyRepository: HistoryRepository,
    private readonly minioClientService: MinioClientService,
  ) {}

  async createSession(image: Express.Multer.File): Promise<HistoryDocument> {
    const imageUrl = await this.minioClientService.upload('temp', image);
    const history = await this.historyRepository.save({
      status: HistoryStatus.PENDING,
      imageUrl,
    });

    const { results, ...response } = history.toDocument();

    return response as HistoryDocument;
  }
}
