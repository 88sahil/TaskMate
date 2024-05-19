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
        withCredentials:false
    })
    
    const logout=()=>{
            api.get('https://taskmate-8wpz.onrender.com/api/user/logout').then((res)=>{
            dispatch(Logout())
            alert('logged out!')
            navigate('/login')
            }).catch((err)=>{
                alert('error 💀')
            })
    }
    return(
        <div>
            {
                user? (
                     <div className="userpage">
            <div>
            <img src={user?.photo} alt="user"></img>
            </div>
            <div className="userpage1">
                <p id="userName">{user?.name || 'name'}</p>
                 <p id="email">{user?.email || 'xyz@domain.com'}</p>
            </div>
        <div className="userpage">
        <button onClick={logout}>LogOut</button>
        </div>
        </div>
                ):(
                    {
                        navigate('/')
                    }
                )
            }
        </div>
    )
}

export default UserPage
