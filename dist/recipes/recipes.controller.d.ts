import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
export declare class RecipesController {
    private readonly recipesService;
    constructor(recipesService: RecipesService);
    create(createRecipeDto: CreateRecipeDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateRecipeDto: UpdateRecipeDto): string;
    remove(id: string): string;
}
