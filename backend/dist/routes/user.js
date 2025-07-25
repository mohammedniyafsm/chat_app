"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const auth_1 = require("../middleware/auth");
const messageController_1 = require("../controller/messageController");
const router = express_1.default.Router();
router.post('/signup', userController_1.Signup);
router.post('/signin', userController_1.Signin);
router.get('/users', auth_1.protect, userController_1.AllUser); //AllUsers Lists
router.post('/send', auth_1.protect, messageController_1.SendMessage); //send messages
router.get('/getmessage', auth_1.protect, messageController_1.getMessage); //get all messages
router.get('/mydata', auth_1.protect, userController_1.Mydata); //get user details
exports.default = router;
