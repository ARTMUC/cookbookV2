import { AuthenticationService } from '../auth.service';
import { User } from '../../users/entities/user.entity';
declare const LocalStrategy_base: new (...args: any[]) => any;
export declare class LocalStrategy extends LocalStrategy_base {
    private authenticationService;
    constructor(authenticationService: AuthenticationService);
    validate(email: string, password: string): Promise<User>;
}
export {};
