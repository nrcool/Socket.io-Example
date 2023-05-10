import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MyContext } from "../context/MyContext";
import {socket} from "../socket.js"
export default function Room() {
  const { id } = useParams();
  const { rooms, setRoom, room, game, user } = useContext(MyContext);

const startGame=()=>{
    
    socket.emit("start_game",{userId:user._id, roomId:room._id,gameData:[23,45,67,54,34,71,87]})
}

const leaveRoom=()=>{
  socket.emit("leave_room",{userId:user._id, roomId:room})
}
  useEffect(() => {
    setRoom(rooms.find((item) => item._id === id));
  }, [rooms,id]);
  return <div>{
    room && <div>
        <h3>players</h3>
        <ul>
            {room.players.map(player=>{
                return (<li key={player._id}>{player.firstName}</li>)
            })}
        </ul>
        {game.length===0 ? <button onClick={startGame}>start game</button>: <div>
            {game.map(num=><li>{num}</li>)}
        </div>}
      <button onClick={leaveRoom}>leave room</button>
    </div>
    }</div>;
}
