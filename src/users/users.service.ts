import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import User from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async checkIfUserExists(email: string) {
    const user = await this.usersRepository.findOne({ email });
    return user;
  }

  async getByEmail(email: string) {
    const user = await this.usersRepository.findOne({ email });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async create(userData: CreateUserDto) {
    const newUser = await this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);
    return newUser;
  }
  async getById(id: string) {
    const user = await this.usersRepository.findOne({ id });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async saveRefreshToken(refreshToken: string, userId: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.usersRepository.update(userId, {
      hashedRefreshToken,
    });
  }
  async removeRefreshToken(userId: string) {
    return this.usersRepository.update(userId, {
      hashedRefreshToken: null,
    });
  }

  async setConfirmUserEmail(userId: string) {
    return this.usersRepository.update(userId, { isUserEmailConfirmed: true });
  }

  // ************ I will not be using this one for now **************
  // async getRefreshTokenId(userId: string) {
  //   const { hashedRefreshToken } = await getConnection()
  //     .createQueryBuilder()
  //     .select('user.hashedRefreshToken')
  //     .from(User, 'user')
  //     .where('user.id = :id', { id: userId })
  //     .getOne();
  //   return hashedRefreshToken;
  // }
  // ************************************************************************
}
