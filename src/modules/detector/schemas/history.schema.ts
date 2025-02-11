import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';

import { UserDocument, UserSchema } from 'src/modules/user/schemas';
import { COLLECTION_NAME } from 'src/shared';

import { BoundingBox, BoundingBoxSchema } from './bounding-box.schema';

export type HistoryDocument = HydratedDocument<History>;

@Schema({
  collection: COLLECTION_NAME.HISTORIES,
  timestamps: true,
  versionKey: false,
})
export class History {
  // @Prop({ type: UserSchema, required: true })
  // userId: UserDocument

  @Prop({ required: false })
  imageUrl: string;

  @Prop({ type: [BoundingBoxSchema], default: [] })
  results: BoundingBox[];
}

export const HistorySchema = SchemaFactory.createForClass(History);
