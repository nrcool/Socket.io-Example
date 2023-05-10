import React, { useEffect, useState } from 'react'
import { MyContext } from './MyContext'
import {socket} from "../socket.js"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function Container({children}) {
    const [user,setUser]=useState(null)
    const [room,setRoom]=useState(null)
    const [rooms,setRooms]=useState([])
    const [players,setPlayers]=useState([])
    const [game,setGame]=useState([])
    const navigate = useNavigate()
console.log(socket.id)
    useEffect(()=>{
        const allRooms=(rooms)=>{
            setRooms(rooms)
        }

        const getGameData=(gamedata)=>{
            setGame(gamedata)
            console.log(gamedata)
        }
        const afterLeave=(rooms,userId)=>{
           
           setUser(user=>{
                if(user._id.toString()===userId){
                    setRooms(rooms)
                    navigate("/lobby")
                    return user;
                }else{
                    setRooms(rooms)
                    return user
                }
            }) 
            
        }
        socket.on("room_created",allRooms)

        socket.on("game_started",getGameData)

        socket.on("after_leave_room_created",afterLeave)

      /*   socket.on("user_left",allRooms) */
        return ()=>{
            socket.off("room_created",allRooms)
            socket.off("game_started",getGameData)
            socket.off("after_leave_room_created",afterLeave)
        }

    },[])
    useEffect(()=>{
        /* if( localStorage.getItem("user")){
            setUser(JSON.parse(localStorage.getItem("user")))
        }  */
       axios.get("/rooms")
       .then(res=>{
        if(res.data.success){
            setRooms(res.data.data)
        }
       })

    },[])

  return (
    <MyContext.Provider value={{user,setUser,room,rooms,setRoom,setRooms,players,setPlayers,game,setGame}}>
        {children}
    </MyContext.Provider> )
}
