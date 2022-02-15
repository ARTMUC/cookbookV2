"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editFileName = exports.imageFileFilter = void 0;
const common_1 = require("@nestjs/common");
const path = require("path");
const uuid_1 = require("uuid");
const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new common_1.HttpException('Only image files are allowed!', 400));
    }
    callback(null, true);
};
exports.imageFileFilter = imageFileFilter;
const editFileName = async (req, file, callback) => {
    try {
        callback(null, (0, uuid_1.v4)() + path.extname(file.originalname));
    }
    catch (error) {
        callback(error);
    }
};
exports.editFileName = editFileName;
//# sourceMappingURL=multer-config.js.map