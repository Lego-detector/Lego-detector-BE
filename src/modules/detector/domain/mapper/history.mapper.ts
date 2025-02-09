import { BaseMapper } from 'src/shared/base';

import { HistoryDocument } from '../../schemas';
import { HistoryEntity } from '../entities';


export class HistoryMapper extends BaseMapper<HistoryDocument, HistoryEntity> {
    toEntity(historyDoc: HistoryDocument): HistoryEntity {
        return new HistoryEntity({
            _id: historyDoc._id,
        });
    }

    toDocument(history: HistoryEntity): Partial<HistoryDocument> {
        return { _id: history._id };
    }
}