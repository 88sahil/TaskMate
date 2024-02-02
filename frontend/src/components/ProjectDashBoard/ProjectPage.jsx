import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {useForm} from 'react-hook-form'
import axios from 'axios'
import './Menu.css'
import { Condate } from "./HomeOver";
const ProjectPage=()=>{
    const {handleSubmit,register} = useForm()
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
    const Addtags =(data)=>{
        api.patch(`/api/projects/addtag/${projectid}`,data).then((res)=>{
            FindProject()
        }).catch((err)=>{
            console.log(err)
        })
    }
    useEffect(()=>{
        FindProject()
    },[])
    return(
        <div>
        {project?  (
            <>
            <div className="project-head">
                <div className="project-head-1">
                 <div className="project-display">
                    <a>project/{project.name}</a>
                    <h1>{project.name}</h1>
                    </div>
                <a><CalendarMonthIcon/>{date}</a>
                </div>    
             </div>
            <div> 
                <table className="midtable">
                    <tr>
                        <th>priority</th>
                        <td id="priority">{project.priority}</td>
                    </tr>
                    <tr>
                        <th>DueDate</th>
                        <td id="duedate">{Condate(project.DueDate)}</td>
                    </tr>
                    <tr>
                        <th>Tags</th>
                        <td id="Tags">{
                            project.tags.length>0?(project.tags.map((ele,index)=>(
                                <a key={index}><img src={ele.photo}></img>{ele}</a>
                            ))):(
                                <a>no tags available</a>
                            )
                        }<button className="addtag">+</button></td>
                    </tr>
                    <tr className="teams">
                        <th>Team</th>
                        <td id="Team">{project.team.length>0?(
                                        project.team.slice(0, 2).map((member, i) => (
                                            <div key={i} className="team">
                                                <img src={member.photo} alt={member.name} />
                                                <a>{member.name}</a>
                                            </div>
                                        ))):(<a className="more">no team available</a>)}{project.team.length>2 && <a>`${project.team.length-2}`</a>}<button className="addtag">+</button></td>
                    </tr>
                    <tr>
                        <th>Discpription</th>
                        <td>{project.discription}</td>
                    </tr>
                </table>
                <div className="tagform">
                    <form onSubmit={handleSubmit(Addtags)}>
                            <input type="text"   {...register("tag",{
                                required:true
                            })} required/>
                            <button type="submit">AddTag</button>
                    </form>
                </div>
            </div> 
            </>
        ):(
            Loader && <div className="loader"></div>
        )}
        </div>
    )
}
export default ProjectPage