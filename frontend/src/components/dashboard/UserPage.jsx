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
        api.get('http://localhost:3000/api/user/logout').then((res)=>{
            dispatch(Logout())
            alert('logged out!')
            navigate('/login')
        }).catch((err)=>{
        })
    }
    return(
        <div className="userpage">
            {user.photo &&<img src={user.photo}></img>}
            <p id="userName">{user.name}</p>
            <p id="email">{user.email}</p>
            <button onClick={logout}>LogOut</button>
        </div>
    )
}

export default UserPage