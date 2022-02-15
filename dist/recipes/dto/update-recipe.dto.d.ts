import { CreateRecipeDto } from './create-recipe.dto';
declare class Photo {
    id: string;
    title: string;
}
declare const UpdateRecipeDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateRecipeDto>>;
export declare class UpdateRecipeDto extends UpdateRecipeDto_base {
    photos?: Photo[];
}
export {};
