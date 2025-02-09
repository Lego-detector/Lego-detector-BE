import { BaseEntity } from 'src/shared/base/base.entity';

import { BoundingBoxDocument, HistoryDocument } from '../../schemas';
import { HistoryMapper } from '../mapper';

export class HistoryEntity extends BaseEntity<HistoryDocument> {
    results: BoundingBoxDocument[] = []
    
    constructor(history: Partial<HistoryDocument>) {
        super();
        Object.assign(this, history);
    }

    toDocument(): Partial<HistoryDocument> {
        return new HistoryMapper().toDocument(this);
    }
}
