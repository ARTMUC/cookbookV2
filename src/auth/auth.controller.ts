import {
  Body,
  Req,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Get,
  Res,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { AuthenticationService } from './auth.service';
import RegisterDto from './dto/register.dto';
import RequestWithUser from './interfaces/request-with-user.interface';
import { LocalAuthenticationGuard } from './guards/local-auth.guard';
import { Response } from 'express';
import JwtAuthenticationGuard from './guards/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import JwtRefreshGuard from './guards/refresh-jwt.guard';

@Controller('auth')
// @UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly usersService: UsersService,
  ) {}

  @Post('signup')
  async register(@Body() registrationData: RegisterDto) {
    return this.authenticationService.signup(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('signin')
  async logIn(@Req() request: RequestWithUser) {
    const { user } = request;
    const jwtCookie = this.authenticationService.createToken(user.id);
    const refreshJwtCookie = this.authenticationService.createRefreshToken(
      user.id,
    );

    request.res.setHeader('Set-Cookie', [jwtCookie, refreshJwtCookie]);
    return user;
  }
  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  @Post('signout')
  async logOut(@Req() request: RequestWithUser) {
    request.res.setHeader(
      'Set-Cookie',
      this.authenticationService.getCookieForLogOut(),
    );
    this.usersService.removeRefreshToken(request.user.id);
    return 'you are logged out';
  }
  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    return user;
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refreshToken')
  refreshToken(@Req() request: RequestWithUser) {
    const user = request.user;
    console.log(user);
    const accessTokenCookie = this.authenticationService.createToken(user.id);
    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return request.user;
  }
}
