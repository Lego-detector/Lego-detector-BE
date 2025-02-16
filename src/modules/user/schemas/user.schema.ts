import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';

import { COLLECTION_NAME, SCHEMA_CONSTRAINTS, UserRole } from 'src/shared';

export type UserDocument = HydratedDocument<User>;

@Schema({
  collection: COLLECTION_NAME.USERS,
  timestamps: true,
  versionKey: false,
})
export class User {
  @Prop({
    required: true,
    maxlength: SCHEMA_CONSTRAINTS.MAX_SHORT_TEXT,
  })
  fname: string;

  @Prop({
    required: true,
    maxlength: SCHEMA_CONSTRAINTS.MAX_SHORT_TEXT,
  })
  lname: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: false })
  password?: string;

  @Prop({ required: true })
  profileUrl: string;

  @Prop({
    required: true,
    enum: UserRole,
    default: UserRole.L1,
  })
  role: UserRole;

  @Prop()
  refreshToken?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
