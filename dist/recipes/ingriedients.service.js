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
exports.IngriedientsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ingriedient_entity_1 = require("./entities/ingriedient.entity");
const recipe_ingriedient_entity_1 = require("./entities/recipe_ingriedient.entity");
let IngriedientsService = class IngriedientsService {
    constructor(ingriedientsRepository, recipeToIngriedientRepo) {
        this.ingriedientsRepository = ingriedientsRepository;
        this.recipeToIngriedientRepo = recipeToIngriedientRepo;
    }
    async checkIfIngriedientExists(name, kcal) {
        return await this.ingriedientsRepository.findOne({
            name,
            kcal,
        });
    }
    async create(ingriedientData, recipe) {
        const ingriedient = await this.checkIfIngriedientExists(ingriedientData.name, ingriedientData.kcal);
        const newIngriedient = ingriedient
            ? ingriedient
            : this.ingriedientsRepository.create(ingriedientData);
        await this.saveIngriedientInRecipe(ingriedientData, newIngriedient, recipe);
        await this.ingriedientsRepository.save(newIngriedient);
        return newIngriedient;
    }
    async saveIngriedientInRecipe(ingriedientData, ingriedient, recipe) {
        const newRecipeIngriedient = this.recipeToIngriedientRepo.create(ingriedientData);
        newRecipeIngriedient.recipe = recipe;
        newRecipeIngriedient.ingriedient = ingriedient;
        await this.recipeToIngriedientRepo.save(newRecipeIngriedient);
    }
    async update(ingriedientData, updatedRecipe) {
        const ingriedient = await this.checkIfIngriedientExists(ingriedientData.name, ingriedientData.kcal);
        const newIngriedient = ingriedient
            ? ingriedient
            : this.ingriedientsRepository.create(ingriedientData);
        await this.updateIngriedientInRecipe(ingriedientData, newIngriedient, updatedRecipe);
        await this.ingriedientsRepository.save(newIngriedient);
        return newIngriedient;
    }
    async updateIngriedientInRecipe(ingriedientData, ingriedient, recipe) {
        const updatedRecipeIngriedient = this.recipeToIngriedientRepo.create(ingriedientData);
        updatedRecipeIngriedient.recipe = recipe;
        updatedRecipeIngriedient.ingriedient = ingriedient;
        await this.recipeToIngriedientRepo.save(updatedRecipeIngriedient);
    }
    async removeAllInRecipe(recipeId) {
        await this.recipeToIngriedientRepo
            .createQueryBuilder()
            .delete()
            .from('recipe_to_ingriedient')
            .where('recipe_to_ingriedient.recipeId = :recipeId', { recipeId })
            .execute();
    }
    findAll() {
        return `This action returns all ingriedients`;
    }
    findOne(id) {
        return `This action returns a #${id} ingriedient`;
    }
    remove(id) {
        return `This action removes a #${id} ingriedient`;
    }
};
IngriedientsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ingriedient_entity_1.Ingriedient)),
    __param(1, (0, typeorm_1.InjectRepository)(recipe_ingriedient_entity_1.RecipeToIngriedient)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], IngriedientsService);
exports.IngriedientsService = IngriedientsService;
//# sourceMappingURL=ingriedients.service.js.map