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
  HttpCode,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import JwtAuthenticationGuard from 'src/auth/guards/jwt-auth.guard';
import RequestWithUser from 'src/auth/interfaces/request-with-user.interface';
import { SortQueryDto } from './dto/sort-query.dto';

@Controller('recipes')
@UseGuards(JwtAuthenticationGuard)
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  @HttpCode(201)
  create(
    @Body() createRecipeDto: CreateRecipeDto,
    @Req() request: RequestWithUser,
  ) {
    return this.recipesService.create(createRecipeDto, request.user);
  }

  @Get('shared/:page')
  findAllShared(
    @Query() sortingParams: SortQueryDto,
    @Param('page') page: number,
  ) {
    const { sort, order } = sortingParams;
    return this.recipesService.findAllShared(sort, order, page);
  }

  @Get('my-recipes/:page')
  findAllUserRecipes(
    @Req() request: RequestWithUser,
    @Query() sortingParams: SortQueryDto,
    @Param('page') page: number,
  ) {
    const {
      user: { id: userId },
    } = request;
    const { sort, order } = sortingParams;
    return this.recipesService.findAllUserRecipes(sort, order, page, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() request: RequestWithUser) {
    const {
      user: { id: userId },
    } = request;
    return this.recipesService.findOne(id, userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRecipeDto: UpdateRecipeDto,
    @Req() request: RequestWithUser,
  ) {
    return this.recipesService.update(id, updateRecipeDto, request.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: RequestWithUser) {
    const {
      user: { id: userId },
    } = request;
    return this.recipesService.remove(id, userId);
  }
}
