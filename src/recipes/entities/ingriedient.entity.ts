import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RecipeToIngriedient } from './recipe_ingriedient.entity';

@Entity()
export class Ingriedient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column()
  kcal: number;

  @OneToMany(
    () => RecipeToIngriedient,
    (recipeToIngriedient) => recipeToIngriedient.ingriedient,
  )
  recipeToIngriedient: RecipeToIngriedient[];
}
