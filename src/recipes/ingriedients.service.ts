import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateIngriedientDto } from './dto/create-ingriedient.dto';
import { UpdateIngriedientDto } from './dto/update-ingriedient.dto';
import { Ingriedient } from './entities/ingriedient.entity';
import { Recipe } from './entities/recipe.entity';
import { RecipeToIngriedient } from './entities/recipe_ingriedient.entity';

@Injectable()
export class IngriedientsService {
  constructor(
    @InjectRepository(Ingriedient)
    private ingriedientsRepository: Repository<Ingriedient>,
    @InjectRepository(RecipeToIngriedient)
    private recipeToIngriedientRepo: Repository<RecipeToIngriedient>,
  ) {}

  private async checkIfIngriedientExists(name: string, kcal: number) {
    return await this.ingriedientsRepository.findOne({
      name,
      kcal,
    });
  }

  async create(ingriedientData: CreateIngriedientDto, recipe: Recipe) {
    const ingriedient = await this.checkIfIngriedientExists(
      ingriedientData.name,
      ingriedientData.kcal,
    );

    const newIngriedient = ingriedient
      ? ingriedient
      : this.ingriedientsRepository.create(ingriedientData);

    await this.saveIngriedientInRecipe(ingriedientData, newIngriedient, recipe);

    await this.ingriedientsRepository.save(newIngriedient);

    return newIngriedient;
  }

  private async saveIngriedientInRecipe(
    ingriedientData: CreateIngriedientDto,
    ingriedient: Ingriedient,
    recipe: Recipe,
  ) {
    const newRecipeIngriedient =
      this.recipeToIngriedientRepo.create(ingriedientData);
    newRecipeIngriedient.recipe = recipe;
    newRecipeIngriedient.ingriedient = ingriedient;

    await this.recipeToIngriedientRepo.save(newRecipeIngriedient);
  }

  async update(ingriedientData: UpdateIngriedientDto, updatedRecipe: Recipe) {
    const ingriedient = await this.checkIfIngriedientExists(
      ingriedientData.name,
      ingriedientData.kcal,
    );

    const newIngriedient = ingriedient
      ? ingriedient
      : this.ingriedientsRepository.create(ingriedientData);

    await this.updateIngriedientInRecipe(
      ingriedientData,
      newIngriedient,
      updatedRecipe,
    );

    await this.ingriedientsRepository.save(newIngriedient);

    return newIngriedient;
  }

  private async updateIngriedientInRecipe(
    ingriedientData: UpdateIngriedientDto,
    ingriedient: Ingriedient,
    recipe: Recipe,
  ) {
    const updatedRecipeIngriedient =
      this.recipeToIngriedientRepo.create(ingriedientData);
    updatedRecipeIngriedient.recipe = recipe;
    updatedRecipeIngriedient.ingriedient = ingriedient;

    await this.recipeToIngriedientRepo.save(updatedRecipeIngriedient);
  }

  async removeAllInRecipe(recipeId: string) {
    await this.recipeToIngriedientRepo
      .createQueryBuilder()
      .delete()
      .from('recipe_to_ingriedient')
      .where('recipe_to_ingriedient.recipeId = :recipeId', { recipeId })
      .execute();
  }

  findAll() {
    return `This action returns all ingriedients`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ingriedient`;
  }

  remove(id: number) {
    return `This action removes a #${id} ingriedient`;
  }
}
