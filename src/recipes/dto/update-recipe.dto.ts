import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { CreateRecipeDto } from './create-recipe.dto';

class Photo {
  id: string;
  title: string;
}

export class UpdateRecipeDto extends PartialType(CreateRecipeDto) {
  @IsOptional()
  photos?: Photo[];
}
