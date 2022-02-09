import { PartialType } from '@nestjs/mapped-types';
import { CreateIngriedientDto } from './create-ingriedient.dto';

export class UpdateIngriedientDto extends PartialType(CreateIngriedientDto) {}
