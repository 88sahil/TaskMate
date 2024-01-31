import React from "react";
import Menu from "./Menu";
import './Menu.css'
import { Outlet } from "react-router-dom";
const MainPage=()=>{
    return(
        <section>
            <div className="mainnav">
                <Menu/>
            </div>
            <div className="outlet">
                <Outlet/>
            </div>
        </section>
    )    
}

export default MainPage