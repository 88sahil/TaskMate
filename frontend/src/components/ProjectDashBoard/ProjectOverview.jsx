import React, { useEffect, useState } from "react";
import './Menu.css'
import axios from "axios";
import ProjectCard from "./ProjectCard";
const ProjectOverview =()=>{
    const api = axios.create({
        withCredentials:true
    })
    const [loader,setloader] = useState(true)
    let [project,setproject] = useState([]);
    useEffect(()=>{
        api.get('https://taskmate-8wpz.onrender.com/api/projects').then((res)=>{
            setloader(false)
            setproject(res.data.projects)
        }).catch((err)=>{
            alert('error')
        })
    },[])
    return(
        <div>
            <div className="po flex flex-wrap gap-4">
                {project.length>0? 
                    project.map((ele)=>(<ProjectCard ele={ele}/>))
                :(
                    <div className="loader"></div>
                )} 
            </div>
            {loader && <div className="loader"></div>}
        </div>
    )
}

export default ProjectOverview