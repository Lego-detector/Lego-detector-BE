import { Date, Types } from 'mongoose';

export abstract class BaseEntity {
    _id: Types.ObjectId
    createdAt: Date
    updatedAt: Date
}