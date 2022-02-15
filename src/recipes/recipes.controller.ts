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
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import JwtAuthenticationGuard from 'src/auth/guards/jwt-auth.guard';
import RequestWithUser from 'src/auth/interfaces/request-with-user.interface';
import { SortQueryDto } from './dto/sort-query.dto';
import fetch from 'node-fetch';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/photos/multer-config';

@Controller('recipes')
@UseGuards(JwtAuthenticationGuard)
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('image', 20, {
      storage: diskStorage({
        destination: './uploadFiles',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @HttpCode(201)
  create(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body('patchData') patchData: string,
    @Req() request: RequestWithUser,
  ) {
    const createRecipeDto: CreateRecipeDto =
      typeof patchData === 'string' ? JSON.parse(patchData) : patchData;

    return this.recipesService.create(createRecipeDto, request.user, files);
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
  @UseInterceptors(
    FilesInterceptor('image', 20, {
      storage: diskStorage({
        destination: './uploadFiles',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  update(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('id') id: string,
    @Body('patchData') patchData: string,
    @Req() request: RequestWithUser,
  ) {
    const updateRecipeDto: UpdateRecipeDto =
      typeof patchData === 'string' ? JSON.parse(patchData) : patchData;
    console.log(updateRecipeDto);

    return this.recipesService.update(id, updateRecipeDto, request.user, files);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: RequestWithUser) {
    const {
      user: { id: userId },
    } = request;
    return this.recipesService.remove(id, userId);
  }
}
