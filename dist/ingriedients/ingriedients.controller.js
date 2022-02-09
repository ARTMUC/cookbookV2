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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngriedientsController = void 0;
const common_1 = require("@nestjs/common");
const ingriedients_service_1 = require("./ingriedients.service");
const create_ingriedient_dto_1 = require("./dto/create-ingriedient.dto");
const update_ingriedient_dto_1 = require("./dto/update-ingriedient.dto");
let IngriedientsController = class IngriedientsController {
    constructor(ingriedientsService) {
        this.ingriedientsService = ingriedientsService;
    }
    create(createIngriedientDto) {
        return this.ingriedientsService.create(createIngriedientDto);
    }
    findAll() {
        return this.ingriedientsService.findAll();
    }
    findOne(id) {
        return this.ingriedientsService.findOne(+id);
    }
    update(id, updateIngriedientDto) {
        return this.ingriedientsService.update(+id, updateIngriedientDto);
    }
    remove(id) {
        return this.ingriedientsService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof create_ingriedient_dto_1.CreateIngriedientDto !== "undefined" && create_ingriedient_dto_1.CreateIngriedientDto) === "function" ? _a : Object]),
    __metadata("design:returntype", void 0)
], IngriedientsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], IngriedientsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], IngriedientsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_b = typeof update_ingriedient_dto_1.UpdateIngriedientDto !== "undefined" && update_ingriedient_dto_1.UpdateIngriedientDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], IngriedientsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], IngriedientsController.prototype, "remove", null);
IngriedientsController = __decorate([
    (0, common_1.Controller)('ingriedients'),
    __metadata("design:paramtypes", [typeof (_c = typeof ingriedients_service_1.IngriedientsService !== "undefined" && ingriedients_service_1.IngriedientsService) === "function" ? _c : Object])
], IngriedientsController);
exports.IngriedientsController = IngriedientsController;
//# sourceMappingURL=ingriedients.controller.js.map