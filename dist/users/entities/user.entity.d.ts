import { BaseEntity } from 'typeorm';
declare class User extends BaseEntity {
    id: string;
    email: string;
    name: string;
    password: string;
    isUserEmailConfirmed: boolean;
    emailConfirmationToken: string;
    hashedRefreshToken?: string;
}
export default User;
