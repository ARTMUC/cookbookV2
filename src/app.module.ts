import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { RecipesModule } from './recipes/recipes.module';
import { IngriedientsModule } from './ingriedients/ingriedients.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './auth/auth.module';

@Module({
  imports: [
    RecipesModule,
    IngriedientsModule,
    TypeOrmModule.forRoot(),
    UsersModule,
    AuthenticationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
