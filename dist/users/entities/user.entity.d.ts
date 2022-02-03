import { Recipe } from 'src/recipes/entities/recipe.entity';
export declare class User {
    id: string;
    email: string;
    name: string;
    password: string;
    isUserEmailConfirmed: boolean;
    emailConfirmationToken: string;
    hashedRefreshToken?: string;
    recipes: Recipe[];
}
