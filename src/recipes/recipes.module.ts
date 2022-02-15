import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { Recipe } from './entities/recipe.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingriedient } from './entities/ingriedient.entity';
import { RecipeToIngriedient } from './entities/recipe_ingriedient.entity';
import { IngriedientsService } from './ingriedients.service';
import { PhotosModule } from 'src/photos/photos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Recipe, Ingriedient, RecipeToIngriedient]),
    PhotosModule,
  ],
  controllers: [RecipesController],
  providers: [RecipesService, IngriedientsService],
})
export class RecipesModule {}
