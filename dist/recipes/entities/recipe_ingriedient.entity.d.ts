import { Ingriedient } from './ingriedient.entity';
import { Recipe } from './recipe.entity';
export declare class RecipeToIngriedient {
    id: string;
    weight: number;
    recipe: Recipe;
    ingriedient: Ingriedient;
}
