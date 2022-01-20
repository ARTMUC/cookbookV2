"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateIngriedientDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_ingriedient_dto_1 = require("./create-ingriedient.dto");
class UpdateIngriedientDto extends (0, mapped_types_1.PartialType)(create_ingriedient_dto_1.CreateIngriedientDto) {
}
exports.UpdateIngriedientDto = UpdateIngriedientDto;
//# sourceMappingURL=update-ingriedient.dto.js.map