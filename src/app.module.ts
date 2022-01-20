import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RecipesModule } from './recipes/recipes.module';
import { IngriedientsModule } from './ingriedients/ingriedients.module';

@Module({
  imports: [UsersModule, RecipesModule, IngriedientsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
