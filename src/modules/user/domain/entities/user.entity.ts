import { generateArgon2Hash, generateSha256Hash, verifyArgon2Hash } from '../../../../shared';
import { BaseEntity } from '../../../../shared/base';
import { UserRole } from '../../../../shared/enum';
import { UserDocument } from '../../schemas';

export class UserEntity extends BaseEntity<UserDocument> {
  fname: string;
  lname: string;
  email: string;
  password: string;
  profileImageUrl: string;
  role: UserRole = UserRole.L1;
  refreshToken: string;

  constructor(user: Partial<UserDocument>) {
    super(user as UserDocument);

    Object.assign(this, user);
  }

  toDocument(): UserDocument {
    this.document.fname = this.fname;
    this.document.lname = this.lname;
    this.document.email = this.email;
    this.document.password = this.password;
    this.document.profileImageUrl = this.profileImageUrl;
    this.document.role = this.role;
    this.document.refreshToken = this.refreshToken;

    return this.document;
  }

  async hashPassword(): Promise<void> {
    this.password = await generateArgon2Hash(this.password);
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
