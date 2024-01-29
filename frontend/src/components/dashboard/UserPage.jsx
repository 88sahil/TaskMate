import React from "react";
import { useDispatch, useSelector } from "react-redux";
import './dashboard.css'
import {logout as Logout} from '../../store/AuthSlice'
import axios from "axios";
import { useNavigate } from "react-router-dom";
const UserPage = ()=>{
    const user = useSelector((state)=>state.auth.UserData)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const api = axios.create({
        withCredentials:true
    })
    const logout=()=>{
            api.get('http://localhost:3000/Logout').then((res)=>{
            dispatch(Logout())
            alert('logged out!')
            navigate('/login')
            }).catch((err)=>{
                alert('error 💀')
            })
    }
    return(
        <div className="userpage">
            <div>
            <img src={user.photo}></img>
            </div>
            <div className="userpage1">
                <p id="userName">{user.name}</p>
                 <p id="email">{user.email}</p>
            </div>
        <div className="userpage">
        <button onClick={logout}>LogOut</button>
        </div>
        </div>
    )
}

export default UserPage