import { IngriedientsService } from './ingriedients.service';
import { CreateIngriedientDto } from './dto/create-ingriedient.dto';
import { UpdateIngriedientDto } from './dto/update-ingriedient.dto';
export declare class IngriedientsController {
    private readonly ingriedientsService;
    constructor(ingriedientsService: IngriedientsService);
    create(createIngriedientDto: CreateIngriedientDto): any;
    findAll(): any;
    findOne(id: string): any;
    update(id: string, updateIngriedientDto: UpdateIngriedientDto): any;
    remove(id: string): any;
}
