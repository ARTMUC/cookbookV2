"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const promises_1 = require("fs/promises");
const path_1 = require("path");
const typeorm_2 = require("typeorm");
const photo_entity_1 = require("./entities/photo.entity");
const FILE_DIRECTORY = (0, path_1.resolve)(__dirname, '../../uploadFiles');
let PhotosService = class PhotosService {
    constructor(photoRepository) {
        this.photoRepository = photoRepository;
    }
    async create(photos, recipe) {
        photos.forEach(async (photo) => {
            const title = `http://localhost:5000/photos/${photo.filename}`;
            const newPhoto = this.photoRepository.create({ title });
            newPhoto.recipe = recipe;
            return await this.photoRepository.save(newPhoto);
        });
        return;
    }
    async findAllRecipePhotos(recipe) {
        return await this.photoRepository
            .createQueryBuilder('photo')
            .where('photo.recipeId = :recipeId', { recipeId: recipe.id })
            .getMany();
    }
    async getOnePhoto(imageName) {
        const imagePath = (0, path_1.resolve)(FILE_DIRECTORY, `${imageName}`);
        return await (0, promises_1.readFile)(imagePath);
    }
    async removeFiles(files) {
        await files.forEach(async (file) => {
            const fileName = file.title.split('photos/')[1];
            const imagePath = (0, path_1.resolve)(FILE_DIRECTORY, `${fileName}`);
            try {
                await (0, promises_1.unlink)(imagePath);
            }
            catch (error) {
                return;
            }
        });
    }
    async update(photos, recipe, photosToBeRemovedList) {
        await photos.forEach(async (photo) => {
            const title = `http://localhost:5000/photos/${photo.filename}`;
            const newPhoto = this.photoRepository.create({ title });
            newPhoto.recipe = recipe;
            return await this.photoRepository.save(newPhoto);
        });
        await this.removeFiles(photosToBeRemovedList);
        return;
    }
    async remove(photos) {
        await photos.forEach(async (photo) => {
            await this.photoRepository.remove(photo);
        });
        await this.removeFiles(photos);
    }
};
PhotosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(photo_entity_1.Photo)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PhotosService);
exports.PhotosService = PhotosService;
//# sourceMappingURL=photos.service.js.map