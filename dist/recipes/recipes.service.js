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
exports.RecipesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const photos_service_1 = require("../photos/photos.service");
const typeorm_2 = require("typeorm");
const recipe_entity_1 = require("./entities/recipe.entity");
const ingriedients_service_1 = require("./ingriedients.service");
let RecipesService = class RecipesService {
    constructor(recipesRepository, ingriedientsService, photosService) {
        this.recipesRepository = recipesRepository;
        this.ingriedientsService = ingriedientsService;
        this.photosService = photosService;
    }
    async create(recipeData, user, files) {
        const savedRecipe = await this.saveRecipe(recipeData, user);
        recipeData.ingriedients.forEach(async (ingriedient) => {
            await this.ingriedientsService.create(ingriedient, savedRecipe);
        });
        await this.photosService.create(files, savedRecipe);
        return 'success';
    }
    async saveRecipe(recipeData, user) {
        const { title, description, isShared } = recipeData;
        const newRecipe = this.recipesRepository.create({
            title,
            description,
            isShared,
            user,
        });
        return await this.recipesRepository.save(newRecipe);
    }
    async findAllShared(sortBy, order, page) {
        const countSharedRecipes = await this.recipesRepository
            .createQueryBuilder('recipe')
            .where('recipe.isShared = :isShared', { isShared: true })
            .getCount();
        const resultsPerPage = 8;
        const totalPages = countSharedRecipes
            ? Math.ceil(countSharedRecipes / resultsPerPage)
            : 1;
        const validatedPageNumber = page <= 0 ? 0 : page >= totalPages ? totalPages - 1 : page - 1;
        const sharedRecipesQuery = (() => {
            let query = this.recipesRepository.createQueryBuilder('recipe');
            query = query.leftJoinAndSelect('recipe.photos', 'photos');
            query = query.leftJoinAndSelect('recipe.user', 'user');
            query = query.leftJoinAndSelect('recipe.recipeToIngriedient', 'recipeToIngriedient');
            query = query.leftJoinAndSelect('recipeToIngriedient.ingriedient', 'ingriedient');
            query = query.where('recipe.isShared = :isShared', {
                isShared: true,
            });
            query = query.limit(resultsPerPage);
            query = query.take(resultsPerPage * validatedPageNumber);
            if (sortBy && order) {
                query = query.orderBy(`recipe.${sortBy}`, order);
            }
            return query;
        })();
        const sharedRecipes = await sharedRecipesQuery.getMany();
        const mappedSharedRecipes = sharedRecipes.map((recipe) => {
            return this.mapRecipeQueryResult(recipe);
        });
        return mappedSharedRecipes;
    }
    async findAllUserRecipes(sortBy, order, page, userId) {
        const countSharedRecipes = await this.recipesRepository
            .createQueryBuilder('recipe')
            .where('recipe.userId = :id', { id: userId })
            .getCount();
        const resultsPerPage = 8;
        const totalPages = countSharedRecipes
            ? Math.ceil(countSharedRecipes / resultsPerPage)
            : 1;
        const validatedPageNumber = page <= 0 ? 0 : page >= totalPages ? totalPages - 1 : page - 1;
        const sharedRecipesQuery = (() => {
            let query = this.recipesRepository.createQueryBuilder('recipe');
            query = query.leftJoinAndSelect('recipe.user', 'user');
            query = query.leftJoinAndSelect('recipe.photos', 'photos');
            query = query.where('recipe.userId = :id', { id: userId });
            query = query.leftJoinAndSelect('recipe.recipeToIngriedient', 'recipeToIngriedient');
            query = query.leftJoinAndSelect('recipeToIngriedient.ingriedient', 'ingriedient');
            query = query.limit(resultsPerPage);
            query = query.take(resultsPerPage * validatedPageNumber);
            if (sortBy && order) {
                query = query.orderBy(`recipe.${sortBy}`, order);
            }
            return query;
        })();
        const userRecipes = await sharedRecipesQuery.getMany();
        const mappedUserRecipes = userRecipes.map((recipe) => {
            return this.mapRecipeQueryResult(recipe);
        });
        return mappedUserRecipes;
    }
    async findOne(id, userId) {
        const recipe = await this.getOneRecipe(id, userId);
        return this.mapRecipeQueryResult(recipe);
    }
    async getOneRecipe(id, userId) {
        const recipe = await this.recipesRepository
            .createQueryBuilder('recipe')
            .leftJoinAndSelect('recipe.user', 'user')
            .leftJoinAndSelect('recipe.photos', 'photos')
            .leftJoinAndSelect('recipe.recipeToIngriedient', 'recipeToIngriedient')
            .leftJoinAndSelect('recipeToIngriedient.ingriedient', 'ingriedient')
            .where('recipe.id = :id', { id })
            .andWhere('recipe.userId = :id OR recipe.isShared = :isShared', {
            id,
            isShared: true,
        })
            .getOne();
        if (!recipe)
            throw new common_1.NotFoundException('recipe not found');
        if (recipe.user.id !== userId && !recipe.isShared)
            throw new common_1.NotFoundException('recipe not found');
        return recipe;
    }
    mapRecipeQueryResult(recipe) {
        return Object.assign(Object.assign({}, recipe), { recipeToIngriedient: undefined, ingriedients: recipe.recipeToIngriedient.map((el) => {
                return {
                    weight: el.weight,
                    id: el.id,
                    name: el.ingriedient.name,
                    kcal: el.ingriedient.kcal,
                };
            }) });
    }
    async update(id, updateRecipeData, user, files) {
        const recipe = await this.findOne(id, user.id);
        const updatedRecipe = await this.updateRecipe(recipe, updateRecipeData, user);
        await this.ingriedientsService.removeAllInRecipe(id);
        updateRecipeData.ingriedients.forEach(async (ingriedient) => {
            await this.ingriedientsService.update(ingriedient, updatedRecipe);
        });
        const photosToBeRemovedList = recipe.photos.filter((item1) => updateRecipeData.photos.some((item2) => item1.id !== item2.id));
        await this.photosService.update(files, updatedRecipe, photosToBeRemovedList);
        return 'success';
    }
    async updateRecipe(recipe, recipeData, user) {
        const { title, description, isShared } = recipeData;
        const updatedRecipe = this.recipesRepository.create(Object.assign(Object.assign({}, recipe), { title,
            description,
            isShared,
            user }));
        return await this.recipesRepository.save(updatedRecipe);
    }
    async remove(id, userId) {
        const recipe = await this.getOneRecipe(id, userId);
        if (!recipe) {
            throw new common_1.NotFoundException('recipe not found');
        }
        await this.ingriedientsService.removeAllInRecipe(id);
        await this.photosService.remove(recipe.photos);
        await this.recipesRepository.remove(recipe);
        return 'success';
    }
};
RecipesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(recipe_entity_1.Recipe)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        ingriedients_service_1.IngriedientsService,
        photos_service_1.PhotosService])
], RecipesService);
exports.RecipesService = RecipesService;
//# sourceMappingURL=recipes.service.js.map