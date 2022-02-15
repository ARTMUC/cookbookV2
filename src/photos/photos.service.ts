import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { readFile, unlink } from 'fs/promises';
import { resolve } from 'path';
import { Recipe } from 'src/recipes/entities/recipe.entity';
import { Repository } from 'typeorm';

import { Photo } from './entities/photo.entity';
import { RemovePhoto } from './interfaces/remove-photo.interface';

const FILE_DIRECTORY = resolve(__dirname, '../../uploadFiles');

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo)
    private photoRepository: Repository<Photo>,
  ) {}

  async create(photos: Array<Express.Multer.File>, recipe: Recipe) {
    photos.forEach(async (photo) => {
      const title = `http://localhost:5000/photos/${photo.filename}`;
      const newPhoto = this.photoRepository.create({ title });
      newPhoto.recipe = recipe;
      return await this.photoRepository.save(newPhoto);
    });
    return;
  }

  async findAllRecipePhotos(recipe: Recipe) {
    return await this.photoRepository
      .createQueryBuilder('photo')
      .where('photo.recipeId = :recipeId', { recipeId: recipe.id })
      .getMany();
  }

  async getOnePhoto(imageName: string) {
    const imagePath = resolve(FILE_DIRECTORY, `${imageName}`);
    return await readFile(imagePath);
  }

  private async removeFiles(files: RemovePhoto[]) {
    await files.forEach(async (file) => {
      const fileName = file.title.split('photos/')[1];
      const imagePath = resolve(FILE_DIRECTORY, `${fileName}`);

      try {
        await unlink(imagePath);
      } catch (error) {
        return;
      }
    });
  }

  async update(
    photos: Array<Express.Multer.File>,
    recipe: Recipe,
    photosToBeRemovedList: RemovePhoto[],
  ) {
    await photos.forEach(async (photo) => {
      const title = `http://localhost:5000/photos/${photo.filename}`;
      const newPhoto = this.photoRepository.create({ title });
      newPhoto.recipe = recipe;
      return await this.photoRepository.save(newPhoto);
    });

    await this.removeFiles(photosToBeRemovedList);

    return;
  }

  async remove(photos: Photo[]) {
    await photos.forEach(async (photo) => {
      await this.photoRepository.remove(photo);
    });

    await this.removeFiles(photos);
  }
}
