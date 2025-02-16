import { BaseEntity } from './base.entity';

export abstract class BaseMapper<T, E extends BaseEntity<T>> {
  abstract toEntity(_args: unknown): E;
}
