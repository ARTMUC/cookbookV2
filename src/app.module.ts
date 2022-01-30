import { ClassSerializerInterceptor, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { RecipesModule } from './recipes/recipes.module';
import { IngriedientsModule } from './ingriedients/ingriedients.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './auth/auth.module';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    RecipesModule,
    IngriedientsModule,
    TypeOrmModule.forRoot(),
    UsersModule,
    AuthenticationModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_PIPE,
    //   useValue: new ValidationPipe({ whitelist: true }),
    // },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: ClassSerializerInterceptor,
    // },
  ],
})
export class AppModule {}
