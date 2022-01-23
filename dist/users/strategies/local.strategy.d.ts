import { UsersService } from '../users.service';
import { User } from '../entities/user.entity';
declare const LocalStrategy_base: new (...args: any[]) => any;
export declare class LocalStrategy extends LocalStrategy_base {
    private usersService;
    constructor(usersService: UsersService);
    validate(email: string, password: string): Promise<User>;
}
export {};
