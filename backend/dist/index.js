"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("./config/db");
const user_1 = __importDefault(require("./routes/user"));
require('dotenv').config();
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ['GET', 'POST'],
        credentials: true,
    }
});
exports.io = io;
app.use((0, cors_1.default)());
(0, db_1.ConnectDB)();
const PORT = process.env.PORT;
app.use(express_1.default.json());
app.use('/user', user_1.default);
app.get('/', (req, res) => {
    res.send("Server Running...");
});
io.on('connection', (socket) => {
    console.log("user Connected", socket.id);
    socket.on('join', (roomId) => {
        console.log(`User joined Room : ${roomId}`);
        socket.join(roomId);
    });
    socket.on('send_message', (data) => {
        const { roomId, message, senderId, receiverId } = data;
        console.log("Broadcasting message", data);
        io.to(roomId).emit('receive_message', data);
    });
    socket.on('disconnect', () => {
        console.log("User disconnected");
    });
});
server.listen(PORT, () => {
    console.log("Server Listing at PORT ", PORT);
});
