
import { BaseMapper } from '../../../../shared/base';
import { UserDocument } from '../../schemas';
import { UserEntity } from '../entities';

export class UserMapper extends BaseMapper<UserDocument, UserEntity> {
  toEntity(userDoc: UserDocument): UserEntity {
    return new UserEntity(userDoc);
  }

  toDocument(user: UserEntity): Partial<UserDocument> {
    return {
      _id: user._id,
      fname: user.fname,
      lname: user.lname,
      role: user.role,
      profileImageUrl: user.profileImageUrl,
      email: user.email,
      password: user.password,
      refreshToken: user.refreshToken,
    };
  }
}
