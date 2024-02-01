import React from "react";
import './Menu.css'
import MovingOutlinedIcon from '@mui/icons-material/MovingOutlined';
import { Condate } from "./HomeOver";
import {NavLink} from 'react-router-dom'
const ProjectCard=(props)=>{
    return(
        <div key={props.index} className="projectCard" {...props}>
            <div className="card-1">
                <a>{Condate(props.ele.DueDate)}</a>
                <NavLink className="go" to={`/Home/ProjectPage/${props.ele._id}`}><MovingOutlinedIcon sx={{color:"black"}}/></NavLink>
            </div>
            <h1>{props.ele.name}</h1>
            <div className="last">
                <img src={props.ele.author.photo}></img>
            </div>
        </div>
    )
}
export default ProjectCard