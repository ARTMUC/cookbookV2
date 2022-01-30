import { Test } from '@nestjs/testing';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { AuthenticationService } from './auth.service';
import User from '../users/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import CreateUserDto from '../users/dto/create-user.dto';

const mockedConfigService = {
  get(key: string) {
    switch (key) {
      case 'JWT_EXPIRATION_TIME':
        return '3600';
    }
  },
};

const mockedJwtService = {
  sign: () => '',
};

describe('The AuthenticationService', () => {
  let authenticationService: AuthenticationService;
  let fakeUsersService: Partial<UsersService>;
  beforeEach(async () => {
    const users: User[] = [];
    fakeUsersService = {
      checkIfUserExists: (email: string) => {
        const newUser = {
          id: '2bad39ce-a839-4e05-be63-23f27614ac30',
          email: 'test@test.com',
          name: 'test',
          password:
            '$2a$10$s5R38krR6g/XfIXRNp/x6eLZCDQJE3IU9eZIFpTdITT8vqeP1c2z.',
          hashedRefreshToken:
            '$2a$10$LeQYcsACbqk.XRiNbEwSguKiTpT36TPI.KAKYIULZdanVG2EWel/q',
        } as User;
        users.push(newUser);
        const filteredUsers = users.filter((user) => user.email === email);
        if (filteredUsers.length < 1) return undefined;
        return Promise.resolve(filteredUsers[0]);
      },
      // find: (email: string) => {
      //   const filteredUsers = users.filter((user) => user.email === email);
      //   return Promise.resolve(filteredUsers);
      // },
      create: (userData: CreateUserDto) => {
        const user = {
          id: '2bad39ce-a839-4e05-be63-23f27614ac30',
          email: 'test@test.com',
          name: 'test',
          password:
            '$2a$10$s5R38krR6g/XfIXRNp/x6eLZCDQJE3IU9eZIFpTdITT8vqeP1c2z.',
          hashedRefreshToken:
            '$2a$10$LeQYcsACbqk.XRiNbEwSguKiTpT36TPI.KAKYIULZdanVG2EWel/q',
        } as User;
        return Promise.resolve(user);
      },
    };
    const module = await Test.createTestingModule({
      providers: [
        { provide: UsersService, useValue: fakeUsersService },
        AuthenticationService,
        {
          provide: ConfigService,
          useValue: mockedConfigService,
        },
        {
          provide: JwtService,
          useValue: mockedJwtService,
        },
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
    }).compile();
    authenticationService = await module.get(AuthenticationService);
  });

  it('throws error if user signup with email that has already been used', async () => {
    await expect(async () => {
      await authenticationService.signup({
        email: 'test@test.com',
        name: 'tester',
        password: 'yyy',
      });
    }).rejects.toThrowError();
  });

  // it('testing new user adding', async () => {
  //   await authenticationService.signup({
  //     email: 'nowy@test.com',
  //     name: 'nowy',
  //     password: 'yyy',
  //   });
  // });
});

