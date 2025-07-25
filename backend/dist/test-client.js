"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_client_1 = require("socket.io-client");
const socket = (0, socket_io_client_1.io)("http://localhost:3000");
socket.on("connect", () => {
    console.log("✅ Connected to backend via Socket.IO");
    // Send a test message
    socket.emit("message", "Hello from client!");
});
socket.on("disconnect", () => {
    console.log("❌ Disconnected from server");
});
