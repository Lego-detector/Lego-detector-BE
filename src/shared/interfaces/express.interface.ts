import { UserDocument } from '../../modules/user/schemas';

declare module 'express' {
  export interface Request {
    user: UserDocument;
  }
}
