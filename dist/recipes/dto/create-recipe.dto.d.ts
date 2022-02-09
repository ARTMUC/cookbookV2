import { CreateIngriedientDto } from './create-ingriedient.dto';
export declare class CreateRecipeDto {
    title: string;
    description: string;
    isShared: boolean;
    ingriedients: CreateIngriedientDto[];
}
