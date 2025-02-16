import { generateArgon2Hash, generateSha256Hash, verifyArgon2Hash } from '../../../../shared';
import { AutoGetter, BaseEntity } from '../../../../shared/base';
import { UserRole } from '../../../../shared/enum';
import { UserDocument } from '../../schemas';

@AutoGetter
export class UserEntity extends BaseEntity<UserDocument> {
  fname: string;
  lname: string;
  email: string;
  password: string;
  profileUrl: string;
  role: UserRole;
  refreshToken: string;
  private userDocument: UserDocument;

  constructor(user: Partial<UserDocument>) {
    super();

    Object.assign(this, user);
    this.userDocument = user as UserDocument;
  }

  toDocument(): UserDocument {
    return this.userDocument;
  }

  async hashPassword(): Promise<void> {
    this.password = await generateArgon2Hash(this.password);
    this.userDocument.password = this.password;
  }

  async verifyPassword(password: string): Promise<boolean> {
    return verifyArgon2Hash(password, this.password);
  }

  updateRefreshToken(refreshToken: string): void {
    this.refreshToken = generateSha256Hash(refreshToken);
  }

  revokeRefreshToken(): void {
    this.refreshToken = undefined;
  }

}
