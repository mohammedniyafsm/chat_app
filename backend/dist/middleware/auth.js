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
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const AuthMidd = req.headers.authorization;
    if (!AuthMidd || !AuthMidd.startsWith("Bearer ")) {
        res.status(401).json({ message: "Token not Provided" });
        return;
    }
    const jwt_key = process.env.JWT_SECRET_KEY;
    try {
        const token = AuthMidd.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, jwt_key);
        req.user = decoded._id;
        next();
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.protect = protect;
