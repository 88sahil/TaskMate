import React, { useEffect } from "react";""
import { Link, NavLink } from "react-router-dom";
import Logo from '../Logo/Logo'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom";
import down from '../../assets/image/down.png'
import logouts from '../../assets/image/logout.png'
import overview from '../../assets/image/overview.png'
import market from '../../assets/image/marketing.png'
import po from '../../assets/image/po.png'
import cl from '../../assets/image/cl.png'
import {logout} from '../../store/AuthSlice'
import reduser from '../../assets/image/reduser.png'
import axios from "axios";
import './Menu.css'
const Menu =()=>{
        const navigate = useNavigate();
        const dispatch = useDispatch()
        let user = useSelector((state)=>state.auth.UserData)
        const api = axios.create({
            withCredentials:true
        })
        const Logout=()=>{
                 api.get('https://taskmate-8wpz.onrender.com/api/user/logout').then((res)=>{
                    dispatch(logout())
                    alert('logged out!')
                    navigate('/login')
                }).catch((err)=>{
                    console.log(err)
                    alert('error 💀')
                })
        }
    return(
                    user? (
                                        <div className="main_menu">
                    <Logo/>
                    <NavLink className="main_menu_user" to="/DashBoard/user">
                            <img src={user.photo} alt="profile" title={user.name} />
                            <div>
                                <p id="User_name">{user.name}<img src={down} alt="down" id="down"></img></p>
                                <p id="user_email">{user.email}</p>
                            </div>
                            <div className="user_buttons">
                                <button onClick={()=>navigate('/DashBoard/user')} className="logout">User<img src={reduser}></img></button>
                                <button className="logout" onClick={Logout}>logout <img src={logouts} alt="logout"></img></button>
                            </div>
                    </NavLink>
                    <div className="menus">
                        <p id='menuname'>Menu</p>
                        <div className="mainmenus">
                            <NavLink className='menunavs' to="/Home/overview"><img src={overview}></img>OverView</NavLink>
                            <NavLink className='menunavs' to="/Home/TaskList"><img src={market}></img>TaskList</NavLink>
                            <NavLink className='menunavs' to="/Home/Projectoverview"><img src={po}></img>ProjectOverview</NavLink>
                            <NavLink className='menunavs' to="/Home/calendar"><img src={cl}></img>Calendar</NavLink>
                        </div>
                    </div>
            </div>
                    ):(
                            navigate('/')
                    )
    )
}

export default Menu
