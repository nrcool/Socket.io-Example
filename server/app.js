import express from "express";
import http from "http"
import cors from "cors"
import { Server } from "socket.io"
import dotenv from "dotenv"
import userRoutes from "./routes/userRoutes.js"
import roomRoutes from "./routes/roomRoutes.js"
import mongoose from "mongoose";
import RoomCollection from "./models/roomSchema.js";
import UserCollection from "./models/userSchema.js";
//load env variables
dotenv.config()

//port
const PORT = process.env.PORT || 8080; 

//initializing express server
const app = express()
const server = http.createServer(app);

const io = new Server(server,{cors:{
    origin:"http://localhost:3000"
}});


//middlewares
app.use(cors({origin:"http://localhost:3000"})) //handle cors error(allow all cross origins)
app.use(express.json()) //parse json data
app.use(express.urlencoded({extended:true}))//parse form-urlencoded data
app.use(express.static("views/public")) //serve static files from public folder





io.on('connection', (socket) => {
  console.log(`a user connected ${socket.id}`);
  socket.on("user_connected",async({socketId,userId })=>{
    console.log(userId,socketId)
    const user= await UserCollection.findByIdAndUpdate(userId,{
        socketId
    })
  })
// _________________________________________________________________

//create new room
socket.on("create_room",async ({roomName,userId})=>{
    console.log("create_room")

    await RoomCollection.create({roomName,userId})
    // send all room
    const rooms = await RoomCollection.find().populate("players")
    io.emit("room_created", rooms)
} )

//join room
socket.on("join_room",async ({userId,roomId})=>{
    const room = await RoomCollection.findById(roomId)
    console.log(room)
    if(room && !room.players.includes(userId)){
        socket.join(room._id.toString())
        room.players.push(userId)
        await room.save()
        // send all updated rooms data
        const rooms = await RoomCollection.find().populate("players")
        io.emit("room_created", rooms)
    }

    //starting game
    socket.on("start_game",({userId,roomId,gameData})=>{
         console.log("starting game",roomId)
        io.in(roomId.toString()).emit("game_started",gameData)
    })

})

//leave room
socket.on("leave_room",async ({userId, roomId})=>{
    console.log("leave",roomId,userId)
    const room = await RoomCollection.findByIdAndUpdate(roomId,{$pull:{players:userId}},{new:true})
    const user = await UserCollection.findByIdAndUpdate(userId,{$unset:{room:null}})
    socket.leave(roomId)
 // send all updated rooms data
 const rooms = await RoomCollection.find().populate("players")
 io.emit("after_leave_room_created", rooms, userId)

})



// _____________________________________________________________________
  socket.on("disconnect",async()=>{
    console.log(`user disconnected ${socket.id}`)
/* 
    const user = await UserCollection.findOne({socketId:socket.id})
    if(user){
        const room = await RoomCollection.findByIdAndUpdate(user.room, {$pull:{players:user._id}},{new:true})
        user.socketId=null;
        user.room=null;
        await user.save()
    } */

 // send all updated rooms data
/*  const rooms = await RoomCollection.find().populate("players")
 io.emit("room_created", rooms) */

  })
});



//Routes
// users
app.use("/users",userRoutes)
// rooms
app.use("/rooms",roomRoutes)

//error handling middleware
app.use((err,req,res,next)=>{
    res.status(err.status||500).json({
        success:false, message:err.message
    })
})

mongoose.connect(process.env.URI,{dbName:process.env.DB}).then(()=>{
    console.log("👍,Connected to DB successfully! ")
    server.listen(PORT, ()=>console.log(`🔥,Server is running 🏃 on port: ${PORT}`))
}).catch(err=>{
    console.error(err.message)
})
//listening all requests
