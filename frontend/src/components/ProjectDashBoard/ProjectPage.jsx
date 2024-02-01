import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import axios from 'axios'
import './Menu.css'
import { Condate } from "./HomeOver";
const ProjectPage=()=>{
    const [Loader,setLoader] = useState(true)
    const {projectid} = useParams()
    const [project,setproject] = useState(null)
    let date = Condate(Date.now())
    const api = axios.create({
        withCreadials:true
    })
    const FindProject =()=>{
        api.get(`/api/projects/${projectid}`).then((res)=>{
            setproject(res.data.project)
            setLoader(false)
        }).catch((err)=>{
            console.log(err.message)
        })
    }
    useEffect(()=>{
        FindProject()
    },[])
    return(
        <div>
        {project?  (
            <div className="project-head">
            <div className="project-head-1">
                <div className="project-display">
                    <a>project/{project.name}</a>
                    <h1>{project.name}</h1>
                </div>
                <a><CalendarMonthIcon/>{date}</a>
            </div>
            <div> 
                   
            </div>     
        </div>
        ):(
            Loader && <div className="loader"></div>
        )}
        </div>
    )
}
export default ProjectPage