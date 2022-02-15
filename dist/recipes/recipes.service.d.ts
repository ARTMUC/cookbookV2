/// <reference types="multer" />
import { PhotosService } from 'src/photos/photos.service';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { orderQuery, sortQuery } from './dto/sort-query.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe } from './entities/recipe.entity';
import { IngriedientsService } from './ingriedients.service';
import { ReturnRecipe } from './interfaces/return-recipe.interface';
export declare class RecipesService {
    private recipesRepository;
    private readonly ingriedientsService;
    private readonly photosService;
    constructor(recipesRepository: Repository<Recipe>, ingriedientsService: IngriedientsService, photosService: PhotosService);
    create(recipeData: CreateRecipeDto, user: User, files: Array<Express.Multer.File>): Promise<string>;
    private saveRecipe;
    findAllShared(sortBy: sortQuery, order: orderQuery, page: number): Promise<ReturnRecipe[]>;
    findAllUserRecipes(sortBy: sortQuery, order: orderQuery, page: number, userId: string): Promise<ReturnRecipe[]>;
    findOne(id: string, userId: string): Promise<ReturnRecipe>;
    private getOneRecipe;
    private mapRecipeQueryResult;
    update(id: string, updateRecipeData: UpdateRecipeDto, user: User, files: Array<Express.Multer.File>): Promise<string>;
    private updateRecipe;
    remove(id: string, userId: string): Promise<string>;
}
