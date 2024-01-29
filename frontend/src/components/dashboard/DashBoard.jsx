import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Logo from '../Logo/Logo'
import './dashboard.css'
import { NavLink,Link } from "react-router-dom";
import user from '../../assets/image/user.png'
import cp from '../../assets/image/password.png'
import uu  from '../../assets/image/update.png'
import {useSelector} from 'react-redux'
const DashBoard = ()=>{
    let User =  useSelector((state)=>state.auth.UserData)    
    const navigate = useNavigate()
    return(
        <div className="dash-main">
            <div className="dash-1">
                <div className="logo">
                    <Logo/>
                </div>
                <div className="buttons">
                    <NavLink className="link"  to='/DashBoard/user'><img src={user}></img><a>User</a></NavLink>
                    <NavLink className="link" to="/DashBoard/changepass"><img src={cp}></img><a>change Password</a></NavLink>
                    <NavLink className="link" to="/DashBoard/updateuser"><img src={uu}></img><a>Update User</a></NavLink>
                </div>
            </div>
            <div className="dash-2">
                <Outlet/>
            </div>
        </div>
    )
}
export default DashBoard