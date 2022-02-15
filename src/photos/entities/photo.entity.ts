import { Recipe } from 'src/recipes/entities/recipe.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @ManyToOne(() => Recipe, (recipe) => recipe.photos)
  recipe: Recipe;
}
