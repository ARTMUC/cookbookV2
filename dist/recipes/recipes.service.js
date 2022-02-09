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
const typeorm_2 = require("typeorm");
const recipe_entity_1 = require("./entities/recipe.entity");
const ingriedients_service_1 = require("./ingriedients.service");
let RecipesService = class RecipesService {
    constructor(recipesRepository, ingriedientsService) {
        this.recipesRepository = recipesRepository;
        this.ingriedientsService = ingriedientsService;
    }
    async create(recipeData, user) {
        const savedRecipe = await this.saveRecipe(recipeData, user);
        recipeData.ingriedients.forEach(async (ingriedient) => {
            await this.ingriedientsService.create(ingriedient, savedRecipe);
        });
        return 'success';
    }
    async saveRecipe(recipeData, user) {
        const newRecipe = this.recipesRepository.create(recipeData);
        newRecipe.user = user;
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
        const recipe = await this.recipesRepository
            .createQueryBuilder('recipe')
            .leftJoinAndSelect('recipe.user', 'user')
            .leftJoinAndSelect('recipe.recipeToIngriedient', 'recipeToIngriedient')
            .leftJoinAndSelect('recipeToIngriedient.ingriedient', 'ingriedient')
            .where('recipe.id = :id', { id })
            .getOne();
        if (!recipe)
            throw new common_1.NotFoundException('recipe not found');
        if (recipe.user.id !== userId && !recipe.isShared)
            throw new common_1.NotFoundException('recipe not found');
        return this.mapRecipeQueryResult(recipe);
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
    async update(id, updateRecipeData, user) {
        const recipe = await this.findOne(id, user.id);
        const patchedRecipeData = Object.assign(Object.assign({}, recipe), updateRecipeData);
        const updatedRecipe = await this.updateRecipe(patchedRecipeData, user);
        await this.ingriedientsService.removeAllInRecipe(id);
        updateRecipeData.ingriedients.forEach(async (ingriedient) => {
            await this.ingriedientsService.update(ingriedient, updatedRecipe);
        });
        return 'success';
    }
    async updateRecipe(patchedRecipeData, user) {
        patchedRecipeData.user = user;
        return (await this.recipesRepository.save(patchedRecipeData));
    }
    async remove(id, userId) {
        const recipe = await this.recipesRepository
            .createQueryBuilder('recipe')
            .leftJoinAndSelect('recipe.user', 'user')
            .where('recipe.userId = :userId', { userId })
            .andWhere('recipe.id = :id', { id })
            .getOne();
        if (!recipe) {
            throw new common_1.NotFoundException('recipe not found');
        }
        await this.ingriedientsService.removeAllInRecipe(id);
        await this.recipesRepository.remove(recipe);
        return 'success';
    }
};
RecipesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(recipe_entity_1.Recipe)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        ingriedients_service_1.IngriedientsService])
], RecipesService);
exports.RecipesService = RecipesService;
//# sourceMappingURL=recipes.service.js.map