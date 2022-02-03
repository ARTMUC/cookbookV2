import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRecipeDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  isShared: boolean;
}
