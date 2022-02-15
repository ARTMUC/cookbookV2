import { User } from 'src/users/entities/user.entity';
import { ReturnIngriedient } from './return-ingriedient.interface';

interface Photo {
  id: string;
  title: string;
}

export interface ReturnRecipe {
  title: string;
  description: string;
  user: User;
  isShared: boolean;
  ingriedients: ReturnIngriedient[];
  photos: Photo[];
}
