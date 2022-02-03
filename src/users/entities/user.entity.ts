import { Exclude } from 'class-transformer';
import { Recipe } from 'src/recipes/entities/recipe.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 150 })
  public name: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: false })
  @Exclude()
  isUserEmailConfirmed: boolean;

  @Column()
  @Exclude()
  emailConfirmationToken: string;

  @Column({
    nullable: true,
  })
  @Exclude()
  hashedRefreshToken?: string;

  @OneToMany(() => Recipe, (recipe) => recipe.user)
  recipes: Recipe[];
}
