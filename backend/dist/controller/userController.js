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
exports.Mydata = exports.AllUser = exports.Signin = exports.Signup = void 0;
const User_1 = __importDefault(require("../model/User"));
const jwt_1 = require("../utils/jwt");
const Signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        const emailExist = yield User_1.default.findOne({ email });
        if (emailExist) {
            res.status(400).json({ message: "Email Already Exist" });
            return;
        }
        const response = new User_1.default({
            username,
            email,
            password
        });
        yield response.save();
        res.status(200).json({ message: "Account Created" });
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});
exports.Signup = Signup;
const Signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const emailExist = yield User_1.default.findOne({ email });
        if (!emailExist) {
            res.status(400).json({ message: "Email not Found" });
            return;
        }
        const response = yield emailExist.comparePassword(password);
        if (!response) {
            res.status(403).json({ message: "Invalid Credentials" });
            return;
        }
        const token = yield (0, jwt_1.generateToken)(emailExist._id.toString());
        res.status(200).json({ message: "Successfully signed in", token });
        return;
    }
    catch (error) {
        res.status(500).json({ message: "sever error ", error });
    }
});
exports.Signin = Signin;
const AllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const search = req.query.search;
        const currentUserId = req.user;
        let users;
        if (search && search.trim() !== "") {
            users = yield User_1.default.find({
                _id: { $ne: currentUserId },
                username: { $regex: search, $options: "i" },
            }).select("-password");
        }
        else {
            users = yield User_1.default.find({
                _id: { $ne: currentUserId },
            }).select("-password");
        }
        res.status(200).json(users);
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.AllUser = AllUser;
const Mydata = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user;
        const response = yield User_1.default.find({ _id: userId }).select('-password');
        res.status(200).json(response);
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.Mydata = Mydata;
