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
let RecipesService = class RecipesService {
    constructor(recipesRepository) {
        this.recipesRepository = recipesRepository;
    }
    async create(recipeData, user) {
        const newRecipe = this.recipesRepository.create(recipeData);
        newRecipe.user = user;
        await this.recipesRepository.save(newRecipe);
        return newRecipe;
    }
    async findAllShared(sortBy, order, page) {
        const resultsPerPage = 2;
        const countSharedRecipes = await this.recipesRepository
            .createQueryBuilder('recipe')
            .where('recipe.isShared = :isShared', { isShared: true })
            .getCount();
        console.log(`count is ${countSharedRecipes}`);
        const totalPages = countSharedRecipes
            ? Math.ceil(countSharedRecipes / resultsPerPage)
            : 1;
        let validatedPageNumber;
        if (page <= 1) {
            validatedPageNumber = 0;
        }
        else if (page >= totalPages) {
            validatedPageNumber = totalPages - 1;
        }
        else {
            validatedPageNumber = page - 1;
        }
        const sharedRecipes = await this.recipesRepository
            .createQueryBuilder('recipe')
            .leftJoinAndSelect('recipe.user', 'user')
            .where('recipe.isShared = :isShared', { isShared: true })
            .limit(resultsPerPage)
            .take(resultsPerPage * validatedPageNumber)
            .orderBy(`recipe.${sortBy}`, order)
            .getMany();
        return sharedRecipes;
    }
    findOne(id) {
        return `This action returns a #${id} recipe`;
    }
    update(id, updateRecipeDto) {
        return `This action updates a #${id} recipe`;
    }
    remove(id) {
        return `This action removes a #${id} recipe`;
    }
};
RecipesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(recipe_entity_1.Recipe)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RecipesService);
exports.RecipesService = RecipesService;
//# sourceMappingURL=recipes.service.js.map