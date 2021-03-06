"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipesModule = void 0;
const common_1 = require("@nestjs/common");
const recipes_service_1 = require("./recipes.service");
const recipes_controller_1 = require("./recipes.controller");
const recipe_entity_1 = require("./entities/recipe.entity");
const typeorm_1 = require("@nestjs/typeorm");
const ingriedient_entity_1 = require("./entities/ingriedient.entity");
const recipe_ingriedient_entity_1 = require("./entities/recipe_ingriedient.entity");
const ingriedients_service_1 = require("./ingriedients.service");
const photos_module_1 = require("../photos/photos.module");
let RecipesModule = class RecipesModule {
};
RecipesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([recipe_entity_1.Recipe, ingriedient_entity_1.Ingriedient, recipe_ingriedient_entity_1.RecipeToIngriedient]),
            photos_module_1.PhotosModule,
        ],
        controllers: [recipes_controller_1.RecipesController],
        providers: [recipes_service_1.RecipesService, ingriedients_service_1.IngriedientsService],
    })
], RecipesModule);
exports.RecipesModule = RecipesModule;
//# sourceMappingURL=recipes.module.js.map