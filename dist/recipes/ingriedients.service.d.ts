import { Repository } from 'typeorm';
import { CreateIngriedientDto } from './dto/create-ingriedient.dto';
import { UpdateIngriedientDto } from './dto/update-ingriedient.dto';
import { Ingriedient } from './entities/ingriedient.entity';
import { Recipe } from './entities/recipe.entity';
import { RecipeToIngriedient } from './entities/recipe_ingriedient.entity';
export declare class IngriedientsService {
    private ingriedientsRepository;
    private recipeToIngriedientRepo;
    constructor(ingriedientsRepository: Repository<Ingriedient>, recipeToIngriedientRepo: Repository<RecipeToIngriedient>);
    private checkIfIngriedientExists;
    create(ingriedientData: CreateIngriedientDto, recipe: Recipe): Promise<Ingriedient>;
    private saveIngriedientInRecipe;
    update(ingriedientData: UpdateIngriedientDto, updatedRecipe: Recipe): Promise<Ingriedient>;
    private updateIngriedientInRecipe;
    removeAllInRecipe(recipeId: string): Promise<void>;
    findAll(): string;
    findOne(id: number): string;
    remove(id: number): string;
}
