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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeToIngriedient = void 0;
const typeorm_1 = require("typeorm");
const ingriedient_entity_1 = require("./ingriedient.entity");
const recipe_entity_1 = require("./recipe.entity");
let RecipeToIngriedient = class RecipeToIngriedient {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], RecipeToIngriedient.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], RecipeToIngriedient.prototype, "weight", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => recipe_entity_1.Recipe, (recipe) => recipe.recipeToIngriedient),
    __metadata("design:type", recipe_entity_1.Recipe)
], RecipeToIngriedient.prototype, "recipe", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ingriedient_entity_1.Ingriedient, (ingriedient) => ingriedient.recipeToIngriedient),
    __metadata("design:type", ingriedient_entity_1.Ingriedient)
], RecipeToIngriedient.prototype, "ingriedient", void 0);
RecipeToIngriedient = __decorate([
    (0, typeorm_1.Entity)()
], RecipeToIngriedient);
exports.RecipeToIngriedient = RecipeToIngriedient;
//# sourceMappingURL=recipe_ingriedient.entity.js.map