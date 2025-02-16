/* eslint-disable @typescript-eslint/no-explicit-any */
import { NotImplementedException } from '@nestjs/common';

import { Date, Types } from 'mongoose';


export const AutoGetter = <T extends { new (...args: any[]): object }>(constructor: T) => {
  return class extends constructor {
    constructor(...args: any[]) {
      super(...args);

      return new Proxy(this, {
        get(target, property: string) {
            return target[property];
        },
      });
    }
  };
}

export abstract class BaseEntity<T> {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;

  toDocument(_entity: BaseEntity<T>): Partial<T> | T {
    throw new NotImplementedException();
  }
}
