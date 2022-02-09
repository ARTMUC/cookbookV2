export interface ReturnIngriedient {
    id: string;
    name: string;
    kcal: number;
    weight: number;
}
export interface ReturnRecipe {
    title: string;
    description: string;
    isShared: boolean;
    ingriedients: ReturnIngriedient[];
}
