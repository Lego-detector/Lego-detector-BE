import { Types } from 'mongoose';

import { HistoryStatus } from '../../../../shared';
import { BaseEntity } from '../../../../shared/base';
import { BoundingBoxDocument, HistoryDocument } from '../../schemas';

export class HistoryEntity extends BaseEntity<HistoryDocument> {
  ownerId: Types.ObjectId;
  imageUrl: string;
  status: HistoryStatus = HistoryStatus.Pending;
  expireIndex: Date = undefined;
  results: BoundingBoxDocument[] = [];

  constructor(history: Partial<HistoryDocument>) {
    super(history as HistoryDocument);

    Object.assign(this, history);
  }

  toDocument(): HistoryDocument {
    this.document.ownerId = this.ownerId;
    this.document.imageUrl = this.imageUrl;
    this.document.status = this.status;
    this.document.results = this.results;
    this.document.expireIndex = this.expireIndex;
    this.document.createdAt = this.createdAt;

    return this.document;
  }

  updateStatus(status: HistoryStatus): void {
    this.status = status;
  }

  markAsCompleted(results: BoundingBoxDocument[]): void {
    this.status = HistoryStatus.Completed;
    this.expireIndex = undefined;
    this.results = results;
  }

  isCompleted(): boolean {
    return this.status === HistoryStatus.Completed;
  }

  isOwner(userId: string): boolean {
    return this.ownerId?.toString() === userId;
  }
}
