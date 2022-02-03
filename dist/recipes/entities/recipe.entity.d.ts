import { User } from 'src/users/entities/user.entity';
export declare class Recipe {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    editedAt?: Date;
    isShared: boolean;
    user: User;
}
