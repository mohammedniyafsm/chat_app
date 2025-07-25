import { io } from "socket.io-client";

const socket = io("wss://chat-app-17eu.onrender.com", {
  withCredentials: true,
  transports: ['websocket'],
});

export default socket;