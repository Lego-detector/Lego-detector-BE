import { BaseEntity } from 'src/shared/base/base.entity';

import { BoundingBoxDocument, HistoryDocument } from '../../schemas';

export class HistoryEntity extends BaseEntity {
    results: BoundingBoxDocument[]
    
    constructor(history: Partial<HistoryDocument>) {
        super();
        Object.assign(this, history);
    }
}
