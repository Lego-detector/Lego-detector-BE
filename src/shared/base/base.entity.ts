import { NotImplementedException } from '@nestjs/common';

import { Date, Types } from 'mongoose';

export abstract class BaseEntity<T> {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;

  toDocument(_entity: BaseEntity<T>): Partial<T> | T {
    throw new NotImplementedException();
  }
}
