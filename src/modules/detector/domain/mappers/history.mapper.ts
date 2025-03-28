
import { BaseMapper } from '../../../../shared/base';
import { HistoryDocument } from '../../schemas';
import { HistoryEntity } from '../entities';

export class HistoryMapper extends BaseMapper<HistoryDocument, HistoryEntity> {
  toEntity(historyDoc: HistoryDocument): HistoryEntity {
    return new HistoryEntity({
      _id: historyDoc._id,
      ownerId: historyDoc.ownerId,
      status: historyDoc.status,
      imageUrl: historyDoc.imageUrl,
      results: historyDoc.results,
      expireIndex: historyDoc.expireIndex
    });
  }
}
