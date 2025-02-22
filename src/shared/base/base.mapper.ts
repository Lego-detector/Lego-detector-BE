import { NotImplementedException } from '@nestjs/common';

import { BaseEntity } from './base.entity';

export abstract class BaseMapper<T, E extends BaseEntity> {
    toEntity(_args: unknown): E {
        throw new NotImplementedException();
    }

    toObject(_args: unknown): Partial<T> {
        throw new NotImplementedException();
    }
}