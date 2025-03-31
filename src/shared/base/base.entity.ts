import { NotImplementedException } from '@nestjs/common';

import { Types } from 'mongoose';

export abstract class BaseEntity<T> {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  protected document: T;

  constructor(doc: Partial<T>) {
    this.document = doc as T;
  }

  toDocument(_entity: BaseEntity<T>): Partial<T> | T {
    throw new NotImplementedException();
  }
}
