import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { ModelRepository } from 'src/shared/database/model.repository';

import { HistoryEntity } from '../domain/entities';
import { HistoryMapper } from '../domain/mapper';
import { History, HistoryDocument } from '../schemas';

export class HistoryRepository extends ModelRepository<HistoryDocument, HistoryEntity> {
    constructor (
        @InjectModel(History.name) 
        private readonly historyModel: Model<HistoryDocument>,
        private readonly historyMapper: HistoryMapper,
    ) {
        super(historyModel, historyMapper);
    }
}