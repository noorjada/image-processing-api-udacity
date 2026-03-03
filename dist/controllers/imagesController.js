"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeImage = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const imageProcessor_1 = __importDefault(require("../utilities/imageProcessor"));
const resizeImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filename = req.query.filename;
    const width = parseInt(req.query.width);
    const height = parseInt(req.query.height);
    if (!filename || !width || !height) {
        res.status(400).send('Missing or invalid parameters');
        return;
    }
    const fullPath = path_1.default.resolve(`assets/full/${filename}.jpg`);
    const thumbPath = path_1.default.resolve(`assets/thumb/${filename}_${width}_${height}.jpg`);
    if (!fs_1.default.existsSync(fullPath)) {
        res.status(404).send('Image not found');
        return;
    }
    if (fs_1.default.existsSync(thumbPath)) {
        res.sendFile(thumbPath);
        return;
    }
    try {
        yield (0, imageProcessor_1.default)(fullPath, thumbPath, width, height);
        res.sendFile(thumbPath);
    }
    catch (_a) {
        res.status(500).send('Error processing image');
    }
});
exports.resizeImage = resizeImage;
