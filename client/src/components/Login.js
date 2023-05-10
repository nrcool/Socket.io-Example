import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { MyContext } from '../context/MyContext'
import axios from 'axios'
import { socket } from '../socket.js'
export default function Login() {
const navigate= useNavigate()
const {setUser} = useContext(MyContext)

    const loginUser=(e)=>{
        e.preventDefault()
        axios.post("/users/login",JSON.stringify({
            email:e.target.email.value,
            password:e.target.password.value
        }),{headers:{"Content-Type":"application/json"}})
        .then(res=>{
            if(res.data.success){
                setUser({...res.data.data,socketId:socket.id})
                socket.emit("user_connected",{userId:res.data.data._id,socketId:socket.id})
                
                localStorage.setItem("user",JSON.stringify(res.data.data))
                navigate("/lobby")
            }
        })
    }
  return (
    <div><h1>Login</h1>
    <form onSubmit={loginUser}>
       
        <label htmlFor="">email: <input type="email" name="email" /></label><br />
        <label htmlFor="">password: <input type="password" name="password" /></label><br />
        <button>Login</button>
    </form>
    </div>
  )
}
