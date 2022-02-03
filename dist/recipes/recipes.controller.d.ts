import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import RequestWithUser from 'src/auth/interfaces/request-with-user.interface';
export declare class RecipesController {
    private readonly recipesService;
    constructor(recipesService: RecipesService);
    create(createRecipeDto: CreateRecipeDto, request: RequestWithUser): Promise<import("./entities/recipe.entity").Recipe>;
    findAllShared(sort: string, order: 'ASC' | 'DESC', page: string): Promise<import("./entities/recipe.entity").Recipe[]>;
    findOne(id: string): string;
    update(id: string, updateRecipeDto: UpdateRecipeDto): string;
    remove(id: string): string;
}
