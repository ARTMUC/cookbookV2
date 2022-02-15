import { Exclude } from 'class-transformer';
import { IsDefined } from 'class-validator';
import { Photo } from 'src/photos/entities/photo.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RecipeToIngriedient } from './recipe_ingriedient.entity';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  editedAt?: Date;

  @Column({ default: false })
  isShared: boolean;

  @ManyToOne(() => User, (user) => user.recipes)
  user: User;

  @OneToMany(
    () => RecipeToIngriedient,
    (recipeToIngriedient) => recipeToIngriedient.recipe,
  )
  recipeToIngriedient: RecipeToIngriedient[];

  @OneToMany(() => Photo, (photos) => photos.recipe)
  photos: Photo[];
}
