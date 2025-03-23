import { Inject, Injectable, Logger, forwardRef } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';

import { Connection } from 'mongoose';

import { UserService } from 'src/modules/user/services';

import { ErrorException } from '../../../common';
import { CODES, UserRole } from '../../../shared';
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

    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService
  ) {}

  async getClassName(): Promise<ClassNameDocument[]> {
    const className = await this.classNameRepository.find({});

    return className.map(cls => cls.toDocument());
  }

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
    const hasQuota = await this.isSessionQuotaRemain(userId, role);

    if (!hasQuota) {
      throw new ErrorException(CODES.OUT_OF_SESSION_QUOTA);
    }

    const history = await this.historyService.create(userId, image);

    history.results = undefined;

    return history.toDocument();
  }

  async markSessionAsCompleted(sessionId: string, results: BoundingBoxDocument[]): Promise<void> {
    await this.historyService.updateHistoryResultsById(sessionId, results);
    this.logger.log(`Job <${sessionId}> done`);
  }

  async isSessionQuotaRemain(userId: string, role: UserRole): Promise<boolean> {
    const remainedQuota = await this.userService.getRemainedQuota(userId, role);

    if (remainedQuota <= 0) {
      return false;
    }

    return true;
  }
}
