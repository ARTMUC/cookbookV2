import { CreateIngriedientDto } from './dto/create-ingriedient.dto';
import { UpdateIngriedientDto } from './dto/update-ingriedient.dto';
export declare class IngriedientsService {
    create(createIngriedientDto: CreateIngriedientDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateIngriedientDto: UpdateIngriedientDto): string;
    remove(id: number): string;
}
