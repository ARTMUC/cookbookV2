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
exports.Ingriedient = void 0;
const typeorm_1 = require("typeorm");
const recipe_ingriedient_entity_1 = require("./recipe_ingriedient.entity");
let Ingriedient = class Ingriedient {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Ingriedient.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Ingriedient.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Ingriedient.prototype, "kcal", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => recipe_ingriedient_entity_1.RecipeToIngriedient, (recipeToIngriedient) => recipeToIngriedient.ingriedient),
    __metadata("design:type", Array)
], Ingriedient.prototype, "recipeToIngriedient", void 0);
Ingriedient = __decorate([
    (0, typeorm_1.Entity)()
], Ingriedient);
exports.Ingriedient = Ingriedient;
//# sourceMappingURL=ingriedient.entity.js.map