import { BaseEntity } from 'typeorm';
declare class User extends BaseEntity {
    id: string;
    email: string;
    password: string;
}
export default User;
