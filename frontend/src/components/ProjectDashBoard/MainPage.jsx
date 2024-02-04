import React from "react";
import Menu from "./Menu";
import './Menu.css'
import { Outlet } from "react-router-dom";
import SegmentIcon from '@mui/icons-material/Segment';
import Logo from "../Logo/Logo";

const MainPage=()=>{
    let navdiv = document.getElementsByClassName("mainnav")[0]
    const viewnav=()=>{
        navdiv.classList.toggle('viewnav')
    }
    return(
        <section>
             <div className="head viewsmall flex items-center justify-center pb-4 border-b border-b-teal-200">
                <a className="navicon w-1/2 px-2"><SegmentIcon onClick={viewnav} sx={{fontSize:40}} /></a>
                <Logo/>
            </div>
            <div className="mainnav" id="mainnav">
                <Menu/>
            </div>
            <div className="outlet">
                <Outlet/>
            </div>
        </section>
    )    
}

export default MainPage