import { UserDocument } from 'src/modules/user/schemas';

declare module 'express' {
  export interface Request {
    user: UserDocument;
  }
}
