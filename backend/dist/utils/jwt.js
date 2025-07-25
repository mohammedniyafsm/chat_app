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
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
const generateToken = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jwt_key = process.env.JWT_SECRET_KEY;
        if (!jwt_key) {
            console.log("payload Not Provided");
        }
        const payload = { _id };
        const token = jsonwebtoken_1.default.sign(payload, jwt_key, { expiresIn: '30d' });
        return token;
    }
    catch (error) {
        console.error("Error While Generating JWT Token", error);
        throw error;
    }
});
exports.generateToken = generateToken;
