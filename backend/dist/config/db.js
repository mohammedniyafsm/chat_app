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
exports.ConnectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
const ConnectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const mongourl = process.env.MONGO_DB_URL;
    try {
        if (!mongourl) {
            console.log("mongoUrl not Provided");
        }
        const response = yield mongoose_1.default.connect(mongourl);
        console.log("Connected To Database");
        return;
    }
    catch (error) {
        console.log("Error While connecting Database");
    }
});
exports.ConnectDB = ConnectDB;
