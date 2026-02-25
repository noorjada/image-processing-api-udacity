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
const imageProcessor_1 = __importDefault(require("../utilities/imageProcessor"));
const fs_1 = __importDefault(require("fs"));
describe('Image Processing Function', () => {
    it('should resize image successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, imageProcessor_1.default)('assets/full/fjord.jpg', 'assets/thumb/test.jpg', 200, 200);
        expect(fs_1.default.existsSync('assets/thumb/test.jpg')).toBeTrue();
    }));
});
