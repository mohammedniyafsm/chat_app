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
exports.getMessage = exports.SendMessage = void 0;
const index_1 = require("../index");
const User_1 = __importDefault(require("../model/User"));
const message_1 = __importDefault(require("../model/message"));
const chat_1 = require("../utils/chat");
const SendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { receiverId, message } = req.body;
    const senderId = req.user;
    try {
        if (!receiverId || !message) {
            res.status(400).json({ message: "Receiver ID or message not found" });
            return;
        }
        const user = yield User_1.default.findOne({ _id: req.user });
        if (!user) {
            res.status(400).json({ message: "User not found" });
            return;
        }
        const recieve = yield User_1.default.findOne({ _id: receiverId });
        if (!recieve) {
            res.status(400).json({ message: "Receiver ID not found" });
            return;
        }
        const roomId = (0, chat_1.getRoomId)(senderId, receiverId);
        const response = new message_1.default({
            userId: req.user,
            receiverId,
            message
        });
        yield response.save();
        index_1.io.to(roomId).emit('new_message', {
            fromUserId: senderId,
            content: message,
            timestamp: new Date(),
        });
        res.status(200).json({ message: "Message Send Succesfully" });
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.SendMessage = SendMessage;
const getMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const receiverId = req.query.receiverId;
    try {
        if (!receiverId) {
            res.status(400).json({ message: "receiverId is required in query" });
            return;
        }
        const messages = yield message_1.default.find({
            $or: [
                { userId: req.user, receiverId },
                { userId: receiverId, receiverId: req.user }
            ]
        }).sort({ timestamp: 1 });
        res.status(200).json(messages);
    }
    catch (error) {
        console.error("Fetch message error:", error);
        res.status(500).json({ message: "Server Error", error });
    }
});
exports.getMessage = getMessage;
