import { Exclude } from 'class-transformer';
import { IsDefined } from 'class-validator';

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Ingriedient } from './ingriedient.entity';
import { Recipe } from './recipe.entity';

@Entity()
export class RecipeToIngriedient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  weight: number;

  @ManyToOne(() => Recipe, (recipe) => recipe.recipeToIngriedient)
  recipe: Recipe;
  @ManyToOne(
    () => Ingriedient,
    (ingriedient) => ingriedient.recipeToIngriedient,
  )
  ingriedient: Ingriedient;

  // @ManyToMany(() => Ingriedient)
  // @JoinTable()
  // ingriedients: Ingriedient[];
  // ******* I need to do many to many with custom properties *********
}
