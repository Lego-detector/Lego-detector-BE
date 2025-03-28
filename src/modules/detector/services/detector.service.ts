import { Inject, Injectable, Logger, forwardRef } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';

import { Connection } from 'mongoose';

import { ErrorException } from '../../../common';
import { CODES, ISessionResultsReponse, UserRole } from '../../../shared';
import { MinioClientService } from '../../minio-client';
import { UserService } from '../../user/services';
import { ClassNameRepository } from '../repositories/className.repository';
import { BoundingBoxDocument, ClassNameDocument, HistoryDocument } from '../schemas';

import { HistoryService } from './history.service';


@Injectable()
export class DetectorService {
  private readonly logger: Logger = new Logger(DetectorService.name);
  constructor(
    @InjectConnection()
    private readonly mongoConnection: Connection,
    private readonly historyService: HistoryService,
    private readonly classNameRepository: ClassNameRepository,
    private readonly minioService: MinioClientService,

    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService
  ) {}

  async getClassName(): Promise<ClassNameDocument[]> {
    const className = await this.classNameRepository.find({});

    return className.map(cls => cls.toDocument());
  }

  async getCompletedSession(sessionId: string, userId: string): Promise<ISessionResultsReponse> {
    const history = await this.historyService.findById(sessionId);

    if (!history.isCompleted()) {
      throw new ErrorException(CODES.SESSIONS_NOT_YET_COMPLETED);
    }

    if (!history.isOwner(userId)) {
      throw new ErrorException(CODES.SESSIONS_NOT_BELONG_TO_USER);
    }

    history.expireIndex = undefined;

    return {
      history: history.toDocument(),
      summary: this.summaryInferenceResults(history.results)
    }
  }

  private summaryInferenceResults(results: BoundingBoxDocument[]): Record<number, number> {
    const summary = new Map();

    results.forEach(res => {
      let val = 1;

      if (summary.has(res.classId)) {
        val += summary.get(res.classId);
      }

      summary.set(res.classId, val);
    });

    return Object.fromEntries(summary);
  }

  async createSession(
    userId: string,
    role: UserRole,
    image: Express.Multer.File,
  ): Promise<HistoryDocument> {
    const hasQuota = await this.isSessionQuotaRemain(userId, role);

    if (!hasQuota) {
      throw new ErrorException(CODES.OUT_OF_SESSION_QUOTA);
    }

    const history = await this.historyService.create(userId, image);

    history.results = undefined;
    history.expireIndex = undefined;

    return history.toDocument();
  }

  async markSessionAsCompleted(sessionId: string, results: BoundingBoxDocument[]): Promise<void> {
    const isSuccess = await this.historyService.updateHistoryResultsById(sessionId, results);
    const resMsg = isSuccess ? 'done' : 'expired'

    this.logger.log(`Job <${sessionId}> ${resMsg}`);
  }

  async isSessionQuotaRemain(userId: string, role: UserRole): Promise<boolean> {
    const remainedQuota = await this.userService.getRemainedQuota(userId, role);

    if (remainedQuota <= 0) {
      return false;
    }

    return true;
  }
}
