import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Logo from '../Logo/Logo'
import './dashboard.css'
import { NavLink,Link } from "react-router-dom";
import user from '../../assets/image/user.png'
import cp from '../../assets/image/password.png'
import uu  from '../../assets/image/update.png'
import {useSelector} from 'react-redux'
import SegmentIcon from '@mui/icons-material/Segment';
const DashBoard = ()=>{
    let User =  useSelector((state)=>state.auth.UserData) 
    const navigate = useNavigate()
    let navdiv;
    useEffect(()=>{
        navdiv = document.getElementsByClassName('dash-1')[0]
        const handlereload=()=>{
            navigate('/')
        }
         window.onbeforeunload = handleReload;
        return () => {
          window.onbeforeunload = null;
        };
    },[])
        
    const viewdiv =()=>{
        navdiv.classList.toggle('viewnav')
    }
   
    return(
        <div className="dash-main">
            <div className="userhead">
                <a className="navicon p-4"><SegmentIcon onClick={viewdiv} sx={{fontSize:45}}/></a>
                <Logo/>
            </div>
            <div className="dash-1">
                    <NavLink to='/Home/overview' className='logonav'>
                        <div className="logo">
                            <Logo/>
                        </div>
                    </NavLink>
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
