/// <reference types="multer" />
import { RecipesService } from './recipes.service';
import RequestWithUser from 'src/auth/interfaces/request-with-user.interface';
import { SortQueryDto } from './dto/sort-query.dto';
export declare class RecipesController {
    private readonly recipesService;
    constructor(recipesService: RecipesService);
    create(files: Array<Express.Multer.File>, patchData: string, request: RequestWithUser): Promise<string>;
    findAllShared(sortingParams: SortQueryDto, page: number): Promise<import("./interfaces/return-recipe.interface").ReturnRecipe[]>;
    findAllUserRecipes(request: RequestWithUser, sortingParams: SortQueryDto, page: number): Promise<import("./interfaces/return-recipe.interface").ReturnRecipe[]>;
    findOne(id: string, request: RequestWithUser): Promise<import("./interfaces/return-recipe.interface").ReturnRecipe>;
    update(files: Array<Express.Multer.File>, id: string, patchData: string, request: RequestWithUser): Promise<string>;
    remove(id: string, request: RequestWithUser): Promise<string>;
}
