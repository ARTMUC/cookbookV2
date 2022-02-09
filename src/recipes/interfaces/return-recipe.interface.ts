import { User } from 'src/users/entities/user.entity';
import { ReturnIngriedient } from './return-ingriedient.interface';

export interface ReturnRecipe {
  title: string;
  description: string;
  user: User;
  isShared: boolean;
  ingriedients: ReturnIngriedient[];
}
