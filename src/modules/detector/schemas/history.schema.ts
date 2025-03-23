import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument, Types } from 'mongoose';

import { User } from 'src/modules/user/schemas';
import { COLLECTION_NAME, HistoryStatus } from 'src/shared';

import { BoundingBox, BoundingBoxSchema } from './bounding-box.schema';

export type HistoryDocument = HydratedDocument<History>;

@Schema({
  collection: COLLECTION_NAME.HISTORIES,
  timestamps: true,
  versionKey: false,
})
export class History {
  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    required: true,
  })
  ownerId: Types.ObjectId;

  @Prop({ required: true })
  imageUrl: string;

  @Prop({
    required: true,
    enum: HistoryStatus,
  })
  status: string;

  @Prop({ type: [BoundingBoxSchema], default: [] })
  results: BoundingBox[];

  @Prop({
    required: false,
    type: Date,
    default: Date.now,
    index: {
      expires: 300,
    },
  })
  expireIndex: Date;
}

export const HistorySchema = SchemaFactory.createForClass(History);
