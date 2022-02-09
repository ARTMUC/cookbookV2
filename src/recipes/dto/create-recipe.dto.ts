import { IsNotEmpty, IsOptional } from 'class-validator';
import { CreateIngriedientDto } from './create-ingriedient.dto';

export class CreateRecipeDto {

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  isShared: boolean;

  @IsOptional()
  ingriedients: CreateIngriedientDto[];
}
