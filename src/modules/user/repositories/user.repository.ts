import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { PaginationDto } from '../../../shared';
import { ModelRepository } from '../../../shared/database';
import { UserEntity } from '../domain/entities';
import { UserMapper } from '../domain/mappers';
import { User, UserDocument } from '../schemas';


export class UserRepository extends ModelRepository<UserDocument, UserEntity> {
  constructor(
    @InjectModel(User.name) userModel: Model<UserDocument>,
    private readonly userMapper: UserMapper,
  ) {
    super(userModel, userMapper);
  }

  async getPaginationUserList(paginationDto: PaginationDto) {
    return this.findWithPagination(
      paginationDto,
      undefined,
      { password: 0, refreshToken: 0 }
    );
  }
}
