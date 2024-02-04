import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Condate } from "./HomeOver";
import axios from 'axios'
export const time = (date)=>{
    let time='';
    let hour = new Date(date).getHours()
    let minute = new Date(date).getMinutes()
    time = hour+':'+minute

    return time
}
const TaskPage = ()=>{
    const {taskid} = useParams()
    const [task,settask] = useState({})
    
    const api = axios.create({
        withCredentials:true
    })
    const findtask=()=>{
        api.get(`/api/tasks/${taskid}`).then((res)=>{
            settask(res.data.task)
        }).catch((err)=>{
            console.log(err.response.data)
        })
    }
    useEffect(()=>{
        findtask()
    },[])
    return(
       <div>
            <h1 className="f text-[2rem] font-bold">{task.name}</h1>
            <table className="taskdetail">
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
            </table>
       </div>
    )
}
export default TaskPage