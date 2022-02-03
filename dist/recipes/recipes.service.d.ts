import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe } from './entities/recipe.entity';
export declare class RecipesService {
    private recipesRepository;
    constructor(recipesRepository: Repository<Recipe>);
    create(recipeData: CreateRecipeDto, user: User): Promise<Recipe>;
    findAllShared(sortBy: string, order: 'ASC' | 'DESC', page: number): Promise<Recipe[]>;
    findOne(id: number): string;
    update(id: number, updateRecipeDto: UpdateRecipeDto): string;
    remove(id: number): string;
}
