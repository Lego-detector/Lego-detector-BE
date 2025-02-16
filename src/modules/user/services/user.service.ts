import { Injectable } from '@nestjs/common';

import { ErrorException } from 'src/common';
import { CODES } from 'src/shared';

import { UserEntity } from '../domain/entities';
import { CreateUserDto } from '../dto';
import { UserRepository } from '../repositories';

@Injectable()
export class UserService {
  constructor (
    private readonly userRepository: UserRepository
  ) {}

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
      }
    );
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const newUser = new UserEntity({
      fname: createUserDto.fname,
      lname: createUserDto.lname,
      email: createUserDto.email,
      profileUrl: 'temp',
      password: createUserDto.password,
    });

    await newUser.hashPassword();

    return this.userRepository.save(newUser.toDocument());
  }

  async revokeRefreshToken(userId: string): Promise<void> {
    const user = await this.findById(userId);

    user.revokeRefreshToken();

    const { _id, ...updateQuery } = user.toDocument();

    await this.userRepository.findByIdAndUpdate(userId, updateQuery);
  }

  async updateRefreshToken(userId: string, refreshToken: string): Promise<void> {
    const user = await this.findById(userId);

    user.updateRefreshToken(refreshToken);

    const { _id, ...updateQuery } = user.toDocument();

    await this.userRepository.findByIdAndUpdate(userId, updateQuery);
  }
}
