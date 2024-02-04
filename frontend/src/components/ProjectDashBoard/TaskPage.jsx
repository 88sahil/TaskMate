import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Condate } from "./HomeOver";
import {useForm} from 'react-hook-form'
import axios from 'axios'
import './Menu.css'
export const time = (date)=>{
    let time='';
    let hour = new Date(date).getHours()
    let minute = new Date(date).getMinutes()
    time = hour+':'+minute
    return time
}
const TaskPage = ()=>{
    const {handleSubmit,register} = useForm()
    const [showuform,setshowuform] = useState(false)
    const [fuser,setfuser] = useState(null)
    const [loader,setloader]=useState(false)
    const {taskid} = useParams()
    const [task,settask] = useState(null)
    const navigate = useNavigate()
    const api = axios.create({
        withCredentials:true
    })
    const deleteTask =()=>{
        api.delete(`/api/tasks/${taskid}`).then((res)=>{
            navigate(`/Home/ProjectPage/${task.project}`)
        })
    }
    const findtask=()=>{
        api.get(`/api/tasks/${taskid}`).then((res)=>{
            settask(res.data.task)
        }).catch((err)=>{
            console.log(err.response.data)
        })
    }
    const FindUser =(data)=>{
        api.post('/api/user/finduser',data).then((res)=>{
            setfuser(res.data.user)
        }).catch((err)=>{
            console.log(err)
        })
    }
    const Adduser =(id)=>{
        const data = {userId:id}
        api.patch(`/api/tasks/addTaskTeam/${taskid}`,data).then((res)=>{
            setshowuform(false)
            setfuser(null)
            findtask()
        }).catch((err)=>{
            alert('error💀')
        })
    }
    const updateProgress = (data)=>{
        setloader(true)
        api.patch(`/api/tasks/${taskid}`,data).then((res)=>{
            findtask()
            setloader(false)
        }).catch((err)=>{
            alert(err.response.data)
        })
    }
    useEffect(()=>{
        findtask()
    },[])
    return(
       <div>
        {
            task? (
                <div>
            <h1 className="f text-[2rem] font-bold">{task.name}</h1>
            <table className="taskdetail flex flex-col gap-[10px]">
                <tr>
                    <th>Discription</th>
                    <td className="font-bold">{task.discription}</td>
                </tr>
                <tr>
                    <th>from</th>
                    <td>{Condate(task.from)}:{time(task.from)}</td>
                </tr>
                <tr>
                    <th>to</th>
                    <td>{Condate(task.to)}:{time(task.to)}</td>
                </tr>
                <tr>
                    <th>
                        progress
                    </th>
                    <td className={`${task.progress==="completed"?"bg-red-400":"" || task.progress ==="in progress"?"bg-green-400":"bg-gray-400"} p-2 text-white font-bold`}>
                        {task.progress}
                    </td>
                </tr>
                <tr className="">
                    <th>
                        author
                    </th>
                    <td>
                        <p className="flex items-center gap-4 bg-yellow-200 rounded-md p-2">{task.author.name}<img className="w-[20px] h-[20px] rounded-full" src={task.author.photo}></img></p>
                    </td>
                </tr>
                <tr className="flex flex-row">
                    <th>
                        Team
                    </th>
                    <td className="flex gap-3 flex-row">
                        {
                            task.team.length>0? (
                                task.team.map((ele)=>(
                                    <p className="flex items-center gap-4 bg-yellow-200 rounded-md p-2">{ele.name}<img className="w-[20px] h-[20px] rounded-full" src={ele.photo}></img></p>
                                ))
                            ):(<p>No team available</p>)
                        }
                    </td>
                </tr>
            </table>
            <div className="tbuttons">
                <button className="bg-red-500" onClick={()=>updateProgress({progress:"completed"})}>Complete</button>
                <button className="bg-green-500" onClick={()=>updateProgress({progress:"in progress"})}>Start Progress</button>
                <button className="bg-orange-500"onClick={deleteTask}>Delete</button>
                <button className="bg-blue-500" onClick={()=>setshowuform((prev)=>!prev)}>AddTeam</button>
            </div>
       </div>
            ):(
                <div className="loader"></div>
            )
        }
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
        {loader && <div className="loader"></div>}
       </div>
    )
}
export default TaskPage