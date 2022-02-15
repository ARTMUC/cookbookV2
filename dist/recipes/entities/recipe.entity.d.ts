import { Photo } from 'src/photos/entities/photo.entity';
import { User } from 'src/users/entities/user.entity';
import { RecipeToIngriedient } from './recipe_ingriedient.entity';
export declare class Recipe {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    editedAt?: Date;
    isShared: boolean;
    user: User;
    recipeToIngriedient: RecipeToIngriedient[];
    photos: Photo[];
}
