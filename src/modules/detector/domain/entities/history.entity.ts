import { HistoryStatus } from 'src/shared';
import { AutoGetter, BaseEntity } from 'src/shared/base/base.entity';

import { BoundingBoxDocument, HistoryDocument } from '../../schemas';

@AutoGetter
export class HistoryEntity extends BaseEntity<HistoryDocument> {
  private historyDoc: HistoryDocument;

  imageUrl: string;
  status: HistoryStatus = HistoryStatus.PENDING;
  results: BoundingBoxDocument[] = [];

  constructor(history: Partial<HistoryDocument>) {
    super();

    Object.assign(this, history);
    this.historyDoc = history as HistoryDocument;
  }

  toDocument(): HistoryDocument {
    return this.historyDoc;
  }
}
