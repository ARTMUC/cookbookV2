import { Repository } from 'typeorm';
import { CreateIngriedientDto } from './dto/create-ingriedient.dto';
import { UpdateIngriedientDto } from './dto/update-ingriedient.dto';
import { Ingriedient } from './entities/ingriedient.entity';
export declare class IngriedientsService {
    private ingriedientsRepository;
    constructor(ingriedientsRepository: Repository<Ingriedient>);
    create(ingriedientData: CreateIngriedientDto): Promise<Ingriedient>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateIngriedientDto: UpdateIngriedientDto): string;
    remove(id: number): string;
}
