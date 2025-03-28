import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';

import { COLLECTION_NAME } from '../../../shared';


export type BoundingBoxDocument = HydratedDocument<BoundingBox>;

export type ClassNameDocument = HydratedDocument<ClassName>;

@Schema({
  _id: false,
  id: false,
  collection: COLLECTION_NAME.CLASSNAMES
})
export class ClassName {
  @Prop({ type: Number, required: true, unique: true })
  classId: number;

  @Prop({ required: true })
  className: string;

  @Prop({ required: true })
  label: string;
}

@Schema({
  _id: false,
})
export class BoundingBox {
  @Prop({ required: true, ref: typeof ClassName })
  classId: number;

  @Prop({ required: true, type: Number })
  conf: number;

  @Prop({ required: true, type: [Number] }) // Array of numbers
  xywh: number[];
}

export const BoundingBoxSchema = SchemaFactory.createForClass(BoundingBox);

export const ClassNameSchema = SchemaFactory.createForClass(ClassName);