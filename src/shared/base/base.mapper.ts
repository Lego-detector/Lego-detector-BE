import { BaseEntity } from './base.entity';

export abstract class BaseMapper<T, E extends BaseEntity<T>> {
    abstract toEntity(_args: unknown): E
    abstract toDocument(_args: unknown): Partial<T>
}