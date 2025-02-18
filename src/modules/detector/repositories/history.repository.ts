import { InjectModel } from '@nestjs/mongoose';

import { utc } from 'moment';
import { Model, Types } from 'mongoose';

import { SortDirection } from 'src/shared';
import { ModelRepository } from 'src/shared/database/model.repository';

import { HistoryEntity } from '../domain/entities';
import { HistoryMapper } from '../domain/mappers';
import { History, HistoryDocument } from '../schemas';


export class HistoryRepository extends ModelRepository<HistoryDocument, HistoryEntity> {
  constructor(
    @InjectModel(History.name)
    private readonly historyModel: Model<HistoryDocument>,
    private readonly historyMapper: HistoryMapper,
  ) {
    super(historyModel, historyMapper);
  }

    async getUserCurrentHistory(userId: string, limitation?: number): Promise<HistoryEntity[]> {
        return this.find(
            { ownerId: new Types.ObjectId(userId) },
            undefined,
            { 
              sort: { createdAt: SortDirection.Ascending },
              limit: limitation
            }
        );
    }

    async getTodayHistory(userId: string, limitation?: number): Promise<HistoryEntity[]> {
      const startOfDay = utc().startOf('day').toDate();
      const endOfDay = utc().endOf('day').toDate();

      return this.find(
        { 
          ownerId: new Types.ObjectId(userId),
          createdAt: {
            $gte: startOfDay,
            $lte: endOfDay
          }
        },
        undefined,
        { 
          sort: { createdAt: SortDirection.Ascending },
          limit: limitation,
        }
    );
    }
}
