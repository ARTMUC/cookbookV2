import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AuthenticationService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AuthenticationController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RefreshJwtStrategy } from './strategies/refresh-jwt.strategy';
import { EmailService } from 'src/email/email.service';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [
    EmailModule,
    UsersModule,
    PassportModule,
    ConfigModule,
    JwtModule.register({}),
    // JwtModule.registerAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => ({
    //     secret: configService.get('JWT_SECRET'),
    //     signOptions: {
    //       expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
    //     },
    //   }),
    // }),
  ],
  providers: [
    AuthenticationService,
    LocalStrategy,
    JwtStrategy,
    RefreshJwtStrategy,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: ClassSerializerInterceptor,
    // },
  ],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
