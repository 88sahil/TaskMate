import React,{useState} from "react";
import { Condate } from "./HomeOver";
import { NavLink } from "react-router-dom";
import MovingOutlinedIcon from '@mui/icons-material/MovingOutlined';
import './Menu.css'
const TaskCard = ({task})=>{
    let due = Condate(task.to)
    let today = Condate(Date.now())
    return(
        <div className={`projectCard`} style={{background:`${due===today? "#D0F0C0":""}`}}>
           <div className="card-1">
            <a className="">{due}</a>
            <NavLink className="go" to=""><MovingOutlinedIcon sx={{color:"black"}}/></NavLink>
           </div>
           <h1>{task.name}</h1>
            <div className="last">
                <img src={task.author.photo} id="firstimg"></img>
                {task.team.length>0 && <img src={task.team[0].photo} id="secondimg"></img>}
            </div>
        </div>
    )
}
export default TaskCard