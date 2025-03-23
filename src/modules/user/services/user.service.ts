import { Inject, Injectable, forwardRef } from '@nestjs/common';

import { ErrorException } from '../../../common';
import { CODES, IPaginationResponse, PaginationDto, ROLE_POLICY, UserRole } from '../../../shared';
import { HistoryDocument } from '../../detector/schemas';
import { HistoryService } from '../../detector/services';
import { MinioClientService } from '../../minio-client';
import { UserEntity } from '../domain/entities';
import { CreateUserDto } from '../dto';
import { UserRepository } from '../repositories';
import { UserDocument } from '../schemas';

@Injectable()
export class UserService {
  constructor(
    private readonly minioClientService: MinioClientService,
    private readonly userRepository: UserRepository,

    @Inject(forwardRef(() => HistoryService))
    private readonly historyService: HistoryService,
  ) {}

  async getPaginationUserList(paginationDto: PaginationDto): Promise<IPaginationResponse<UserDocument>> {
    return this.userRepository.getPaginationUserList(paginationDto);
  }

  async getHistory(user: UserEntity): Promise<HistoryDocument[]> {
    const histories = await this.historyService.getUserCurrentHistory(
      user._id.toString(),
      user.role,
    );

    return histories.map(entity => entity.toDocument());
  }

  async findById(userId: string): Promise<UserEntity> {
    const user = this.userRepository.findById(userId);

    if (!user) {
      throw new ErrorException(CODES.USER_NOT_FOUND);
    }

    return user;
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne(
      { email },
      {
        refreshToken: 0,
      },
    );
  }

  async create(
    createUserDto: CreateUserDto,
    profileImage?: Express.Multer.File,
  ): Promise<UserEntity> {
    if (profileImage) {
      createUserDto.profileImageUrl = this.minioClientService.generateFileName(profileImage);
    }

    const newUser = new UserEntity({
      ...createUserDto,
      profileImageUrl: 'temp',
    });

    if (createUserDto.password) {
      newUser.password = createUserDto.password;
      await newUser.hashPassword();
    }

    //TODO: Create sessions to save new user then upload file to minio
    //If upload failed. Sessions will abort

    return this.userRepository.save(newUser.toDocument());
  }

  async revokeRefreshToken(userId: string): Promise<void> {
    const user = await this.findById(userId);

    user.revokeRefreshToken();

    await this.updateUserById(userId, user);
  }

  async updateRefreshToken(userId: string, refreshToken: string): Promise<void> {
    const user = await this.findById(userId);

    user.updateRefreshToken(refreshToken);

    await this.updateUserById(userId, user);
  }

  async updateRole(userId: string, role: UserRole): Promise<void> {
    const user = await this.findById(userId);
    
    user.updateRole(role);

    await this.updateUserById(userId, user);
  }

  private updateUserById(userId: string, user: UserEntity): Promise<UserEntity> {
    const { _id, ...updateQuery } = user.toDocument();

    return this.userRepository.findByIdAndUpdate(userId, updateQuery)
  }

  async getRemainedQuota(userId: string, role: UserRole): Promise<number> {
    const policy = ROLE_POLICY.get(role);
    const quota = policy.SESSION_LIMIT;
    const usedQuota = await this.historyService.getTodayHistoryNumber(userId);

    return quota - usedQuota;
  }
}
