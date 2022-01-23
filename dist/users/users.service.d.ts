import { Repository } from 'typeorm';
import User from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    checkIfUserExists(email: string): Promise<User>;
    getByEmail(email: string): Promise<User>;
    create(userData: CreateUserDto): Promise<User>;
    getById(id: string): Promise<User>;
}
