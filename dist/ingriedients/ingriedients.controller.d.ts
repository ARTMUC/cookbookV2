import { IngriedientsService } from './ingriedients.service';
import { CreateIngriedientDto } from './dto/create-ingriedient.dto';
import { UpdateIngriedientDto } from './dto/update-ingriedient.dto';
export declare class IngriedientsController {
    private readonly ingriedientsService;
    constructor(ingriedientsService: IngriedientsService);
    create(createIngriedientDto: CreateIngriedientDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateIngriedientDto: UpdateIngriedientDto): string;
    remove(id: string): string;
}
