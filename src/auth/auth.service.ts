import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
import RegisterDto from './dto/register.dto';
import TokenPayload from './interfaces/token-payload.interface';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signup(registrationData: RegisterDto) {
    const user = await this.usersService.checkIfUserExists(
      registrationData.email,
    );
    if (user)
      throw new HttpException(
        'User with that email already exists',
        HttpStatus.BAD_REQUEST,
      );

    const hashedPassword = await bcrypt.hash(registrationData.password, 10);

    const createdUser = await this.usersService.create({
      ...registrationData,
      password: hashedPassword,
    });
    createdUser.password = undefined;
    return createdUser;
  }

  public async getAuthenticatedUser(email: string, hashedPassword: string) {
    try {
      const user = await this.usersService.getByEmail(email);
      const isPasswordMatching = await bcrypt.compare(
        hashedPassword,
        user.password,
      );
      if (!isPasswordMatching) {
        throw new HttpException(
          'Wrong credentials provided',
          HttpStatus.BAD_REQUEST,
        );
      }
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  public createToken(userId: string) {
    const payload: TokenPayload = { userId };
    const secret = this.configService.get('JWT_SECRET');
    const expiresIn = this.configService.get('JWT_EXPIRATION_TIME');
    const token = this.jwtService.sign(payload, { secret: secret });

    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${expiresIn}`;
  }
  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}
