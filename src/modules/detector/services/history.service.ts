import { Injectable } from '@nestjs/common';

import { HistoryStatus } from '../../../shared';
import { MinioClientService } from '../../minio-client';
import { HistoryEntity } from '../domain/entities';
import { HistoryRepository } from '../repositories';

@Injectable()
export class HistoryService {
    constructor(
        private readonly minioClientService: MinioClientService,
        private readonly historyRepository: HistoryRepository,
    ) {}

    async create(image: Express.Multer.File): Promise<HistoryEntity> {
        const imageUrl = await this.minioClientService.upload('temp', image);
        const history = new HistoryEntity({ 
            status: HistoryStatus.PENDING,
            imageUrl
        }).toDocument();

        return this.historyRepository.save(history);
    }
}