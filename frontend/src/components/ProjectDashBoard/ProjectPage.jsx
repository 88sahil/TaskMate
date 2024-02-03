import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {useForm} from 'react-hook-form'
import axios from 'axios'
import './Menu.css'
import { Condate } from "./HomeOver";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
const ProjectPage=()=>{
    const navigate = useNavigate()
    const {handleSubmit,register} = useForm()
    const [Loader,setLoader] = useState(true)
    const [showtag,setshowtag] = useState(false)
    const [showuform,setshowuform] = useState(false)
    const [fuser,setfuser] = useState(null)
    const {projectid} = useParams()
    const [project,setproject] = useState(null)
    let date = Condate(Date.now())
    const api = axios.create({
        withCreadials:true
    })
    //find project
    const FindProject =()=>{
        api.get(`/api/projects/${projectid}`).then((res)=>{
            setproject(res.data.project)
            setLoader(false)
        }).catch((err)=>{
            console.log(err.message)
        })
    }
    //add tag
    const Addtags =(data)=>{
        api.patch(`/api/projects/addtag/${projectid}`,data).then((res)=>{
            setshowtag(false)
            FindProject()
        }).catch((err)=>{
            console.log(err)
        })
    }
    //deletetag
    const DeleteTag = (name)=>{
        const data = {tag:name}
        api.patch(`/api/projects/removetag/${projectid}`,data).then((res)=>{
            FindProject()
        }).catch((err)=>{
            alert('err💀')
        })
    }
    //find user
    const FindUser =(data)=>{
        api.post('/api/user/finduser',data).then((res)=>{
            setfuser(res.data.user)
        }).catch((err)=>{
            console.log(err)
        })
    }
    //ad user in project
    const Adduser =(id)=>{
        const data = {userId:id}
        api.patch(`/api/projects/addteam/${projectid}`,data).then((res)=>{
            setshowuform(false)
            setfuser(null)
            FindProject()
        }).catch((err)=>{
            alert('error💀')
        })
    }
    //deletepoject
    const deleteproject = ()=>{
        api.delete(`/api/projects/${projectid}`).then((res)=>{
            navigate('/Home/overview')
        }).catch((err)=>{
            alert('error')
        })
    }
    const addtask = (data)=>{
        console.log(data)
    }
    console.log(new Date("2024-02-03T18:14"))
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
                    <h1 id="projectname">{project.name} <ArrowDropDownIcon id="arrow" sx={{fontSize:50}}/></h1>
                    <button id="deleteproject" onClick={deleteproject}>Delete {project.name}</button>
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
                    <tr className="Tagsrow">
                        <th>Tags</th>
                        <td id="Tags">{
                            project.tags.length>0?(project.tags.map((ele,index)=>(
                                <a key={index}>{ele}<button onClick={()=>DeleteTag(ele)}>x</button></a>
                            ))):(
                                <a>no tags available</a>
                            )
                        }<button className="addtag" onClick={()=>setshowtag((prev)=>!prev)}>+</button>
                        {showtag && <form onSubmit={handleSubmit(Addtags)} id="tagform">
                            <input type="text" placeholder="Eg., Design"   {...register("tag",{
                                 required:true
                            })} required/>
                        <button type="submit">AddTag</button>
                </form>}</td>
                    </tr>
                    <tr className="teams">
                        <th>Team</th>
                        <td id="Team">{project.team.length>0?(
                                        project.team.slice(0, 2).map((member, i) => (
                                            <div key={i} className="team">
                                                <img src={member.photo} alt={member.name} />
                                                <a>{member.name}</a>
                                            </div>
                                        ))):(<a className="more">no team available</a>)}{project.team.length>2 && <a id="plus">&#x2b;{project.team.length-2}</a>}<button className="addtag" onClick={()=>setshowuform((prev)=>!prev)}>+</button></td>
                    </tr>
                    <tr>
                        <th>Discpription</th>
                        <td id="discription">{project.discription}</td>
                    </tr>
                </table>
                {showuform && <div className="FindUser">
                        <form onSubmit={handleSubmit(FindUser)} id="userForm">
                            <input type="text" name="find" id="find" placeholder="eg., xyx@gmail.com" required {...register("email")}/>
                            <button type="submit">Find</button>
                        </form>
                       {fuser && 
                       <div className="userdiv">
                            <img src={fuser.photo} />
                            <a>{fuser.email}</a> 
                            <button onClick={()=>Adduser(fuser._id)}>Add</button>
                        </div>}
                </div>}
            </div> 
                        {/* //TODO - taks block starts here */}
                        <div className="taskblock">
                            <button>AddTask<ArrowCircleDownIcon/></button>
                            <form onSubmit={handleSubmit(addtask)}>
                                <input type="datetime-local" {...register("from")} min={Date.now()} max={project.DueDate}required/>
                                <button>submit</button>
                            </form>
                        </div>
            </>
        ):(
            Loader && <div className="loader"></div>
        )}
        </div>
    )
}
export default ProjectPage