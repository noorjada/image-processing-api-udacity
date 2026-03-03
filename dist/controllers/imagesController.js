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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const imageProcessor_1 = __importDefault(require("../utilities/imageProcessor"));
const resizeImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filename = req.query.filename;
    const widthStr = req.query.width;
    const heightStr = req.query.height;
    // Validate filename parameter
    if (!filename) {
        res.status(400).json({ error: 'Missing filename parameter' });
        return;
    }
    // Validate width parameter exists
    if (!widthStr) {
        res.status(400).json({ error: 'Missing width parameter' });
        return;
    }
    // Validate height parameter exists
    if (!heightStr) {
        res.status(400).json({ error: 'Missing height parameter' });
        return;
    }
    // Validate width is a valid number (no letters allowed)
    if (!/^\d+$/.test(widthStr)) {
        res
            .status(400)
            .json({ error: 'Invalid width value. Width must be a number' });
        return;
    }
    const width = parseInt(widthStr, 10);
    // Validate height is a valid number (no letters allowed)
    if (!/^\d+$/.test(heightStr)) {
        res
            .status(400)
            .json({ error: 'Invalid height value. Height must be a number' });
        return;
    }
    const height = parseInt(heightStr, 10);
    // Validate width is a positive number
    if (width <= 0) {
        res
            .status(400)
            .json({ error: 'Invalid width value. Width must be greater than 0' });
        return;
    }
    // Validate height is a positive number
    if (height <= 0) {
        res
            .status(400)
            .json({ error: 'Invalid height value. Height must be greater than 0' });
        return;
    }
    // Validate filename format (alphanumeric and underscores only)
    if (!/^[a-zA-Z0-9_-]+$/.test(filename)) {
        res.status(400).json({
            error: 'Invalid filename. Filename must contain only alphanumeric characters, underscores, and hyphens',
        });
        return;
    }
    const fullPath = path_1.default.resolve(`assets/full/${filename}.jpg`);
    const thumbPath = path_1.default.resolve(`assets/thumb/${filename}_${width}_${height}.jpg`);
    // Check if image file exists
    if (!fs_1.default.existsSync(fullPath)) {
        res.status(404).json({ error: 'Image file not found' });
        return;
    }
    // Return cached thumbnail if it exists
    if (fs_1.default.existsSync(thumbPath)) {
        res.sendFile(thumbPath);
        return;
    }
    try {
        yield (0, imageProcessor_1.default)(fullPath, thumbPath, width, height);
        res.sendFile(thumbPath);
    }
    catch (error) {
        console.error('Error processing image:', error);
        res.status(500).json({ error: 'Error processing image' });
    }
});
exports.resizeImage = resizeImage;
