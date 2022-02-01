import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { EmailService } from 'src/email/email.service';
import { UsersService } from '../users/users.service';
import RegisterDto from './dto/register.dto';
import TokenPayload from './interfaces/token-payload.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
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
    const emailConfirmationToken = uuid();

    const createdUser = await this.usersService.create({
      ...registrationData,
      password: hashedPassword,
      emailConfirmationToken,
    });
    await this.emailService.sendUserConfirmationEmail(createdUser);
    return createdUser;
  }

  public async getAuthenticatedUser(email: string, plainPassword: string) {
    const user = await this.usersService.getByEmail(email);
    const isPasswordMatching = await bcrypt.compare(
      plainPassword,
      user.password,
    );

    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!user.isUserEmailConfirmed)
      throw new HttpException(
        'Please confirm your email first',
        HttpStatus.BAD_REQUEST,
      );
    // user.password = undefined;
    return user;
  }

  public createToken(userId: string) {
    const payload: TokenPayload = { userId };
    const secret = this.configService.get('JWT_SECRET');
    const expiresIn = this.configService.get('JWT_EXPIRATION_TIME');
    const token = this.jwtService.sign(payload, {
      secret: secret,
      expiresIn: `${expiresIn}s`,
    });

    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${expiresIn}`;
  }

  public createRefreshToken(userId: string) {
    const payload: TokenPayload = { userId };
    const secret = this.configService.get('REFRESH_TOKEN_SECRET');
    const expiresIn = this.configService.get('REFRESH_TOKEN_EXPIRATION_TIME');
    const token = this.jwtService.sign(payload, {
      secret: secret,
      expiresIn: `${expiresIn}s`,
    });
    this.usersService.saveRefreshToken(token, userId);
    return `Refresh=${token}; HttpOnly; Path=/; Max-Age=${expiresIn}`;
  }

  public async confirmUserEmailWithToken(id: string, token: string) {
    const { emailConfirmationToken } = await this.usersService.getById(id);
    if (token !== emailConfirmationToken)
      throw new HttpException(
        'wrong confirmation token - please contact administrator',
        HttpStatus.BAD_REQUEST,
      );
    await this.usersService.setConfirmUserEmail(id);
    return 'email confirmed successfully';
  }

  public getCookieForLogOut() {
    return [
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0',
    ];
  }
}
