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
exports.RecipesController = void 0;
const common_1 = require("@nestjs/common");
const recipes_service_1 = require("./recipes.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const sort_query_dto_1 = require("./dto/sort-query.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const multer_config_1 = require("../photos/multer-config");
let RecipesController = class RecipesController {
    constructor(recipesService) {
        this.recipesService = recipesService;
    }
    create(files, patchData, request) {
        const createRecipeDto = typeof patchData === 'string' ? JSON.parse(patchData) : patchData;
        return this.recipesService.create(createRecipeDto, request.user, files);
    }
    findAllShared(sortingParams, page) {
        const { sort, order } = sortingParams;
        return this.recipesService.findAllShared(sort, order, page);
    }
    findAllUserRecipes(request, sortingParams, page) {
        const { user: { id: userId }, } = request;
        const { sort, order } = sortingParams;
        return this.recipesService.findAllUserRecipes(sort, order, page, userId);
    }
    findOne(id, request) {
        const { user: { id: userId }, } = request;
        return this.recipesService.findOne(id, userId);
    }
    update(files, id, patchData, request) {
        const updateRecipeDto = typeof patchData === 'string' ? JSON.parse(patchData) : patchData;
        console.log(updateRecipeDto);
        return this.recipesService.update(id, updateRecipeDto, request.user, files);
    }
    remove(id, request) {
        const { user: { id: userId }, } = request;
        return this.recipesService.remove(id, userId);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('image', 20, {
        storage: (0, multer_1.diskStorage)({
            destination: './uploadFiles',
            filename: multer_config_1.editFileName,
        }),
        fileFilter: multer_config_1.imageFileFilter,
    })),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)('patchData')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String, Object]),
    __metadata("design:returntype", void 0)
], RecipesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('shared/:page'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Param)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sort_query_dto_1.SortQueryDto, Number]),
    __metadata("design:returntype", void 0)
], RecipesController.prototype, "findAllShared", null);
__decorate([
    (0, common_1.Get)('my-recipes/:page'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Param)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, sort_query_dto_1.SortQueryDto, Number]),
    __metadata("design:returntype", void 0)
], RecipesController.prototype, "findAllUserRecipes", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], RecipesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('image', 20, {
        storage: (0, multer_1.diskStorage)({
            destination: './uploadFiles',
            filename: multer_config_1.editFileName,
        }),
        fileFilter: multer_config_1.imageFileFilter,
    })),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)('patchData')),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String, String, Object]),
    __metadata("design:returntype", void 0)
], RecipesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], RecipesController.prototype, "remove", null);
RecipesController = __decorate([
    (0, common_1.Controller)('recipes'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.default),
    __metadata("design:paramtypes", [recipes_service_1.RecipesService])
], RecipesController);
exports.RecipesController = RecipesController;
//# sourceMappingURL=recipes.controller.js.map