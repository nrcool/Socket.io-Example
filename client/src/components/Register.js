import axios from 'axios'
import React, { useContext } from 'react'
import { MyContext } from '../context/MyContext'
import { useNavigate } from 'react-router-dom'

export default function Register() {

    const {setUser}=useContext(MyContext)
    const navigate= useNavigate()
    const registerUser=(e)=>{
        e.preventDefault()
        axios.post("/users",JSON.stringify({
            firstName:e.target.firstName.value,
            lastName:e.target.lastName.value,
            email:e.target.email.value,
            password:e.target.password.value
        }))
        .then(res=>{
            if(res.data.success){
                setUser(res.data.data)
                navigate("/login")
            }
        })

    }
  return (
    <div><h1>Register</h1>
    <form onSubmit={registerUser}>
        <label htmlFor="">FirstName: <input type="text" name="firstName" /></label><br />
        <label htmlFor="">LastName: <input type="text" name="lastName" /></label><br />
        <label htmlFor="">email: <input type="email" name="email" /></label><br />
        <label htmlFor="">password: <input type="password" name="password" /></label><br />
        <button>Register</button>
    </form>
    </div>
  )
}
