import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { UsersService } from '../../users/users.service';
import TokenPayload from '../interfaces/token-payload.interface';
declare const RefreshJwtStrategy_base: new (...args: any[]) => any;
export declare class RefreshJwtStrategy extends RefreshJwtStrategy_base {
    private readonly configService;
    private readonly userService;
    constructor(configService: ConfigService, userService: UsersService);
    validate(request: Request, payload: TokenPayload): Promise<import("../../users/entities/user.entity").default>;
}
export {};
