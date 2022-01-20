import { Injectable } from '@nestjs/common';
import { CreateIngriedientDto } from './dto/create-ingriedient.dto';
import { UpdateIngriedientDto } from './dto/update-ingriedient.dto';

@Injectable()
export class IngriedientsService {
  create(createIngriedientDto: CreateIngriedientDto) {
    return 'This action adds a new ingriedient';
  }

  findAll() {
    return `This action returns all ingriedients`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ingriedient`;
  }

  update(id: number, updateIngriedientDto: UpdateIngriedientDto) {
    return `This action updates a #${id} ingriedient`;
  }

  remove(id: number) {
    return `This action removes a #${id} ingriedient`;
  }
}
