/// <reference types="multer" />
/// <reference types="node" />
import { Recipe } from 'src/recipes/entities/recipe.entity';
import { Repository } from 'typeorm';
import { Photo } from './entities/photo.entity';
import { RemovePhoto } from './interfaces/remove-photo.interface';
export declare class PhotosService {
    private photoRepository;
    constructor(photoRepository: Repository<Photo>);
    create(photos: Array<Express.Multer.File>, recipe: Recipe): Promise<void>;
    findAllRecipePhotos(recipe: Recipe): Promise<Photo[]>;
    getOnePhoto(imageName: string): Promise<Buffer>;
    private removeFiles;
    update(photos: Array<Express.Multer.File>, recipe: Recipe, photosToBeRemovedList: RemovePhoto[]): Promise<void>;
    remove(photos: Photo[]): Promise<void>;
}
