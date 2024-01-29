import React from "react";
import { useSelector } from "react-redux";
import './dashboard.css'
const UserPage = ()=>{
    const user = useSelector((state)=>state.auth.UserData)
    return(
        <div className="userpage">
            {user.photo &&<img src={user.photo}></img>}
            <p id="userName">{user.name}</p>
            <p id="email">{user.email}</p>
            <button>LogOut</button>
        </div>
    )
}

export default UserPage