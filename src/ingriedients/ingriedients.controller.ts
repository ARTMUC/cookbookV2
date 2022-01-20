import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IngriedientsService } from './ingriedients.service';
import { CreateIngriedientDto } from './dto/create-ingriedient.dto';
import { UpdateIngriedientDto } from './dto/update-ingriedient.dto';

@Controller('ingriedients')
export class IngriedientsController {
  constructor(private readonly ingriedientsService: IngriedientsService) {}

  @Post()
  create(@Body() createIngriedientDto: CreateIngriedientDto) {
    return this.ingriedientsService.create(createIngriedientDto);
  }

  @Get()
  findAll() {
    return this.ingriedientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ingriedientsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIngriedientDto: UpdateIngriedientDto) {
    return this.ingriedientsService.update(+id, updateIngriedientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ingriedientsService.remove(+id);
  }
}
