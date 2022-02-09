import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ReturnIngriedient } from '../interfaces/return-ingriedient.interface';

export class CreateIngriedientDto implements ReturnIngriedient {
  @IsOptional()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  kcal: number;

  @IsNotEmpty()
  @IsNumber()
  weight: number;
}
