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

@Controller('auth')
// @UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('signup')
  async register(@Body() registrationData: RegisterDto) {
    return this.authenticationService.signup(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('signin')
  async logIn(@Req() request: RequestWithUser) {
    const { user } = request;
    const cookie = this.authenticationService.createToken(user.id);
    request.res.setHeader('Set-Cookie', cookie);
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
    return 'you are logged out';
  }
  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    // user.password = undefined;
    return user;
  }
}
