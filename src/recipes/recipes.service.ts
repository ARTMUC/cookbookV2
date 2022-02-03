import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { createQueryBuilder, getConnection, Repository } from 'typeorm';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe } from './entities/recipe.entity';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private recipesRepository: Repository<Recipe>,
  ) {}

  async create(recipeData: CreateRecipeDto, user: User) {
    const newRecipe = this.recipesRepository.create(recipeData);
    newRecipe.user = user;
    await this.recipesRepository.save(newRecipe);
    return newRecipe;
  }

  async findAllShared(sortBy: string, order: 'ASC' | 'DESC', page: number) {
    const resultsPerPage = 2;

    const countSharedRecipes = await this.recipesRepository
      .createQueryBuilder('recipe')
      .where('recipe.isShared = :isShared', { isShared: true })
      .getCount();

    console.log(`count is ${countSharedRecipes}`);

    const totalPages = countSharedRecipes
      ? Math.ceil(countSharedRecipes / resultsPerPage)
      : 1;

    let validatedPageNumber: number;
    if (page <= 1) {
      validatedPageNumber = 0;
    } else if (page >= totalPages) {
      validatedPageNumber = totalPages - 1;
    } else {
      validatedPageNumber = page - 1;
    }
    //@TODO either refactor this page validation or throw it to utils folder

    const sharedRecipes = await this.recipesRepository
      .createQueryBuilder('recipe')
      .leftJoinAndSelect('recipe.user', 'user')
      .where('recipe.isShared = :isShared', { isShared: true })
      .limit(resultsPerPage)
      .take(resultsPerPage * validatedPageNumber)
      .orderBy(`recipe.${sortBy}`, order)
      .getMany();

    // @TODO add SOME KIND OF VALIDATION FOR sortBy and order constants -> need to return 400 if something is wrong
    return sharedRecipes;
  }

  findOne(id: number) {
    return `This action returns a #${id} recipe`;
  }

  update(id: number, updateRecipeDto: UpdateRecipeDto) {
    return `This action updates a #${id} recipe`;
  }

  remove(id: number) {
    return `This action removes a #${id} recipe`;
  }
}
