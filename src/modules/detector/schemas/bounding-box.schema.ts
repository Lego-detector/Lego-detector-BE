import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';

export type BoundingBoxDocument = HydratedDocument<BoundingBox>;

@Schema()
export class BoundingBox {
  @Prop({ required: true, type: Number })
  class_name: number;

  @Prop({ required: true, type: Number })
  conf: number;

  @Prop({ required: true, type: [Number] }) // Array of numbers
  xywh: number[];
}

export const BoundingBoxSchema = SchemaFactory.createForClass(BoundingBox);
