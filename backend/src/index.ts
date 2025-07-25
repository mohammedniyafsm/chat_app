import express from "express";
import { ConnectDB } from "./config/db";
import router from "./routes/user";
require('dotenv').config();
import { Server } from "socket.io"
import { createServer } from "http"
import cors from "cors"

const app = express();
const server = createServer(app);
const frontendUrl=process.env.FRONTEND_URL

const io = new Server(server,{
  cors : {
    origin : frontendUrl,
    methods : ['GET','POST'],
    credentials : true,
  }
})

app.use(cors());
ConnectDB();
const PORT = process.env.PORT as string;

app.use(express.json());
app.use('/user',router);

app.get('/',(req,res)=>{
    res.send("Server Running...")
})

io.on('connection', (socket)=>{
  console.log("user Connected",socket.id);

   socket.on("error", (err) => {
    console.error(" Socket error:", err);
  });

  socket.on('join',(roomId : string)=>{
    console.log(`User joined Room : ${roomId}`);
    socket.join(roomId);
  })

    socket.on('send_message', (data) => {
    const { roomId, message, senderId, receiverId } = data;
    io.to(roomId).emit('receive_message', data);
    console.log(data);
    
  });
  
  socket.on('disconnect',()=>{
    console.log("User disconnected");
  })
})

server.listen(PORT,()=>{
    console.log("Server Listing at PORT ",PORT);
})

export {io};