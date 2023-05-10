import React, { useContext } from 'react'
import { MyContext } from '../context/MyContext'
import { socket } from '../socket'
import { useNavigate } from 'react-router-dom'

export default function Lobby() {
    const {rooms,user}=useContext(MyContext)
    const navigate = useNavigate()
    const createRoom=(e)=>{
        e.preventDefault()
        console.log(user)
        socket.emit("create_room",{roomName:e.target.roomName.value, userId:user._id})
        
    }

    const joinRoom=(id)=>{
        socket.emit("join_room",{userId:user._id,roomId:id})
        navigate(`/lobby/${id}`)
    }
  return (
    <div><h1>
        lobby</h1>
        <div style={{display:"flex"}}>
            {rooms.map(room=>{
                return(<div key={room._id}>
                    <h2>Room Name: {room.roomName}</h2>
                    <h3>Players: {room.players.length}/4</h3>
                    <button disabled={room.players.length===4} onClick={()=>joinRoom(room._id)}>join</button>
                </div>)
            })}
        </div>
        <form onSubmit={createRoom}>
            <label htmlFor="">Room_Name: <input type="text" name="roomName" /> </label><br />
            <button>createRoom</button>

        </form>
        </div>
  )
}
