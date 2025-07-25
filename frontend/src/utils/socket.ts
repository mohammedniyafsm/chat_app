import { io } from "socket.io-client";

const socket = io("https://chat-app-17eu.onrender.com", {
  withCredentials: true,
  transports: ['websocket'],
});

export default socket;

