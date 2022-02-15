import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import RequestWithUser from 'src/auth/interfaces/request-with-user.interface';
import { PhotosService } from 'src/photos/photos.service';
import { User } from 'src/users/entities/user.entity';
import { createQueryBuilder, getConnection, Repository } from 'typeorm';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { orderQuery, sortQuery } from './dto/sort-query.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe } from './entities/recipe.entity';
import { IngriedientsService } from './ingriedients.service';
import { ReturnRecipe } from './interfaces/return-recipe.interface';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private recipesRepository: Repository<Recipe>,
    private readonly ingriedientsService: IngriedientsService,
    private readonly photosService: PhotosService,
  ) {}

  async create(
    recipeData: CreateRecipeDto,
    user: User,
    files: Array<Express.Multer.File>,
  ) {
    const savedRecipe = await this.saveRecipe(recipeData, user);
    recipeData.ingriedients.forEach(async (ingriedient) => {
      await this.ingriedientsService.create(ingriedient, savedRecipe);
    });

    await this.photosService.create(files, savedRecipe);

    return 'success';
  }

  private async saveRecipe(recipeData: CreateRecipeDto, user: User) {
    const { title, description, isShared } = recipeData;
    const newRecipe = this.recipesRepository.create({
      title,
      description,
      isShared,
      user,
    });
    return await this.recipesRepository.save(newRecipe);
  }

  async findAllShared(sortBy: sortQuery, order: orderQuery, page: number) {
    const countSharedRecipes = await this.recipesRepository
      .createQueryBuilder('recipe')
      .where('recipe.isShared = :isShared', { isShared: true })
      .getCount();

    const resultsPerPage = 8;

    const totalPages = countSharedRecipes
      ? Math.ceil(countSharedRecipes / resultsPerPage)
      : 1;

    const validatedPageNumber =
      page <= 0 ? 0 : page >= totalPages ? totalPages - 1 : page - 1;

    const sharedRecipesQuery = (() => {
      let query = this.recipesRepository.createQueryBuilder('recipe');
      query = query.leftJoinAndSelect('recipe.photos', 'photos');
      query = query.leftJoinAndSelect('recipe.user', 'user');
      query = query.leftJoinAndSelect(
        'recipe.recipeToIngriedient',
        'recipeToIngriedient',
      );
      query = query.leftJoinAndSelect(
        'recipeToIngriedient.ingriedient',
        'ingriedient',
      );
      query = query.where('recipe.isShared = :isShared', {
        isShared: true,
      });
      query = query.limit(resultsPerPage);
      query = query.take(resultsPerPage * validatedPageNumber);
      if (sortBy && order) {
        query = query.orderBy(`recipe.${sortBy}`, order);
      }

      return query;
    })();

    const sharedRecipes = await sharedRecipesQuery.getMany();

    const mappedSharedRecipes = sharedRecipes.map((recipe) => {
      return this.mapRecipeQueryResult(recipe);
    });

    return mappedSharedRecipes;
  }

  async findAllUserRecipes(
    sortBy: sortQuery,
    order: orderQuery,
    page: number,
    userId: string,
  ) {
    const countSharedRecipes = await this.recipesRepository
      .createQueryBuilder('recipe')
      .where('recipe.userId = :id', { id: userId })
      .getCount();

    const resultsPerPage = 8;

    const totalPages = countSharedRecipes
      ? Math.ceil(countSharedRecipes / resultsPerPage)
      : 1;

    const validatedPageNumber =
      page <= 0 ? 0 : page >= totalPages ? totalPages - 1 : page - 1;

    const sharedRecipesQuery = (() => {
      let query = this.recipesRepository.createQueryBuilder('recipe');
      query = query.leftJoinAndSelect('recipe.user', 'user');
      query = query.leftJoinAndSelect('recipe.photos', 'photos');
      query = query.where('recipe.userId = :id', { id: userId });
      query = query.leftJoinAndSelect(
        'recipe.recipeToIngriedient',
        'recipeToIngriedient',
      );
      query = query.leftJoinAndSelect(
        'recipeToIngriedient.ingriedient',
        'ingriedient',
      );
      query = query.limit(resultsPerPage);
      query = query.take(resultsPerPage * validatedPageNumber);
      if (sortBy && order) {
        query = query.orderBy(`recipe.${sortBy}`, order);
      }
      return query;
    })();

    const userRecipes = await sharedRecipesQuery.getMany();

    const mappedUserRecipes = userRecipes.map((recipe) => {
      return this.mapRecipeQueryResult(recipe);
    });

    return mappedUserRecipes;
  }

  async findOne(id: string, userId: string) {
    const recipe = await this.getOneRecipe(id, userId);
    return this.mapRecipeQueryResult(recipe);
  }

  private async getOneRecipe(id: string, userId: string) {
    const recipe = await this.recipesRepository
      .createQueryBuilder('recipe')
      .leftJoinAndSelect('recipe.user', 'user')
      .leftJoinAndSelect('recipe.photos', 'photos')
      .leftJoinAndSelect('recipe.recipeToIngriedient', 'recipeToIngriedient')
      .leftJoinAndSelect('recipeToIngriedient.ingriedient', 'ingriedient')
      .where('recipe.id = :id', { id })
      .andWhere('recipe.userId = :id OR recipe.isShared = :isShared', {
        id,
        isShared: true,
      })
      .getOne();

    if (!recipe) throw new NotFoundException('recipe not found');
    if (recipe.user.id !== userId && !recipe.isShared)
      throw new NotFoundException('recipe not found');

    return recipe;
  }

  private mapRecipeQueryResult(recipe: Recipe): ReturnRecipe {
    return {
      ...recipe,
      recipeToIngriedient: undefined,
      ingriedients: recipe.recipeToIngriedient.map((el) => {
        return {
          weight: el.weight,
          id: el.id,
          name: el.ingriedient.name,
          kcal: el.ingriedient.kcal,
        };
      }),
    } as ReturnRecipe;
  }

  async update(
    id: string,
    updateRecipeData: UpdateRecipeDto,
    user: User,
    files: Array<Express.Multer.File>,
  ) {
    const recipe = await this.findOne(id, user.id);

    const updatedRecipe = await this.updateRecipe(
      recipe,
      updateRecipeData,
      user,
    );

    await this.ingriedientsService.removeAllInRecipe(id);

    updateRecipeData.ingriedients.forEach(async (ingriedient) => {
      await this.ingriedientsService.update(ingriedient, updatedRecipe);
    });

    const photosToBeRemovedList = recipe.photos.filter((item1) =>
      updateRecipeData.photos.some((item2) => item1.id !== item2.id),
    );
    await this.photosService.update(
      files,
      updatedRecipe,
      photosToBeRemovedList,
    );

    return 'success';
  }

  private async updateRecipe(
    recipe: ReturnRecipe,
    recipeData: UpdateRecipeDto,
    user: User,
  ) {
    const { title, description, isShared } = recipeData;
    const updatedRecipe = this.recipesRepository.create({
      ...recipe,
      title,
      description,
      isShared,
      user,
    });
    return await this.recipesRepository.save(updatedRecipe);
  }

  async remove(id: string, userId: string) {
    const recipe = await this.getOneRecipe(id, userId);

    if (!recipe) {
      throw new NotFoundException('recipe not found');
    }
    await this.ingriedientsService.removeAllInRecipe(id);
    await this.photosService.remove(recipe.photos);
    await this.recipesRepository.remove(recipe);
    return 'success';
  }
}
