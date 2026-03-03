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
const fs_1 = __importDefault(require("fs"));
const imageProcessor_1 = __importDefault(require("../utilities/imageProcessor"));
describe('Image Processing', () => {
    it("Resizing an image that doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, imageProcessor_1.default)('assets/full/nonexistent.jpg', 'assets/thumb/test_nonexistent.jpg', 200, 200);
            expect(true).toBe(false); // Should not reach here
        }
        catch (_a) {
            expect(true).toBe(true); // Should throw an error
        }
    }));
    it('A thumbnail should exist after resizing', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Create a test thumbnail by processing an existing image
            yield (0, imageProcessor_1.default)('assets/full/fjord.jpg', 'assets/thumb/fjord_thumbnail.jpg', 200, 200);
            expect(fs_1.default.existsSync('assets/thumb/fjord_thumbnail.jpg')).toBeTrue();
            // Cleanup
            if (fs_1.default.existsSync('assets/thumb/fjord_thumbnail.jpg')) {
                fs_1.default.unlinkSync('assets/thumb/fjord_thumbnail.jpg');
            }
        }
        catch (error) {
            // If processing fails, fail the test
            expect(true).toBe(false);
        }
    }));
});
