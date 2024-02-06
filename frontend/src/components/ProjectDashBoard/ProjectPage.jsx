import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {useForm} from 'react-hook-form'
import axios from 'axios'
import './Menu.css'
import { Condate } from "./HomeOver";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import TaskCard from "./TaskCard";
const ProjectPage=()=>{
    const navigate = useNavigate()
    const {handleSubmit,register} = useForm()
    const [Loader,setLoader] = useState(true)
    const [showtag,setshowtag] = useState(false)
    const [showuform,setshowuform] = useState(false)
    const [fuser,setfuser] = useState(null)
    const {projectid} = useParams()
    const [project,setproject] = useState(null)
    const [showtaskform,setshowtaskform] = useState(false)
    let date = Condate(Date.now())
    const api = axios.create({
        withCreadials:true
    })
    //find project
    const FindProject =()=>{
        api.get(`https://taskmate-8wpz.onrender.com/api/projects/${projectid}`).then((res)=>{
            setproject(res.data.project)
            setLoader(false)
        }).catch((err)=>{
            console.log(err.message)
        })
    }
    //add tag
    const Addtags =(data)=>{
        api.patch(`https://taskmate-8wpz.onrender.com/api/projects/addtag/${projectid}`,data).then((res)=>{
            setshowtag(false)
            FindProject()
        }).catch((err)=>{
            console.log(err)
        })
    }
    //deletetag
    const DeleteTag = (name)=>{
        const data = {tag:name}
        api.patch(`https://taskmate-8wpz.onrender.com/api/projects/removetag/${projectid}`,data).then((res)=>{
            FindProject()
        }).catch((err)=>{
            alert('err💀')
        })
    }
    //find user
    const FindUser =(data)=>{
        api.post('https://taskmate-8wpz.onrender.com/api/user/finduser',data).then((res)=>{
            setfuser(res.data.user)
        }).catch((err)=>{
            console.log(err)
        })
    }
    //ad user in project
    const Adduser =(id)=>{
        const data = {userId:id}
        api.patch(`https://taskmate-8wpz.onrender.com/api/projects/addteam/${projectid}`,data).then((res)=>{
            setshowuform(false)
            setfuser(null)
            FindProject()
        }).catch((err)=>{
            alert('error💀')
        })
    }
    //deletepoject
    const deleteproject = ()=>{
        api.delete(`https://taskmate-8wpz.onrender.com/api/projects/${projectid}`).then((res)=>{
            navigate('/Home/overview')
        }).catch((err)=>{
            alert('error')
        })
    }
    const addtask = (data)=>{
        console.log("hello")
        setLoader(true)
        api.post(`https://taskmate-8wpz.onrender.com/api/projects/${projectid}/task`,data).then((res)=>{
            setLoader(false)
            FindProject()
            setshowtaskform(false)
        }).catch((err)=>{
            alert('error💀')
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
                        <td id="Tags" className="flex flex-wrap flex-1">{
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
                        <td id="Team" className="flex flex-wrap flex-1">{project.team.length>0?(
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
                            <button onClick={()=>setshowtaskform(prev=>!prev)}>AddTask<ArrowCircleDownIcon/></button>
                            {showtaskform &&<form className="projectform" onSubmit={handleSubmit(addtask)}>
                                <div className="frm1">
                                    <label htmlFor="projectname">TaskName:</label>
                                    <input type="text" name="projectname" placeholder="eg.,TaskMate" {...register("name",{required:true})} required></input>
                                </div>
                                <div className="frm1">
                                    <label htmlFor="Discription">Discription:</label>
                                    <textarea name="Discription" placeholder="eg.,TaskMate is my fist project" rows="5" {...register("discription")}></textarea>
                                </div>
                                <div className="frm1">
                                    <label htmlFor="from" >from:</label>
                                    <input type="Datetime-local" name="from" {...register("from")} required></input>
                                </div>
                                <div className="frm1">
                                    <label htmlFor="to" >to:</label>
                                    <input type="Datetime-local" name="to" {...register("to")} required></input>
                                </div>
                                <div className="frm1">
                                    <label htmlFor="progress">progress:</label>
                                    <select className="priority" name="progress" {...register("progress")}>
                                        <option value="created" selected>created</option>
                                        <option value="in progress">in progress</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>
                                <div className="formbuttons">
                                    <button type="submit" >Save</button>
                                    <button onClick={()=>setshowtaskform(false)}>Cancel</button>
                                </div>
                         </form>}
                        </div>
                        <div>
                            {/* //TODO - tasks apear here */}
                                <div className="tasks flex">
                                    {
                                        project.task.map((ele)=>(
                                            <TaskCard task={ele}/>
                                        ))
                                    }
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