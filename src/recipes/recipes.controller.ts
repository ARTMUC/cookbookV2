import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import JwtAuthenticationGuard from 'src/auth/guards/jwt-auth.guard';
import RequestWithUser from 'src/auth/interfaces/request-with-user.interface';

@Controller('recipes')
@UseGuards(JwtAuthenticationGuard)
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  create(
    @Body() createRecipeDto: CreateRecipeDto,
    @Req() request: RequestWithUser,
  ) {
    return this.recipesService.create(createRecipeDto, request.user);
  }

  @Get(':page')
  findAllShared(
    @Query('sort') sort: string,
    @Query('order') order: 'ASC' | 'DESC',
    @Param('page') page: string,
  ) {
    return this.recipesService.findAllShared(sort, order, parseInt(page));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
    return this.recipesService.update(+id, updateRecipeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipesService.remove(+id);
  }
}
