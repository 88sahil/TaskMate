import axios from "axios";
import React, { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
const TaskList =()=>{
    const [task,settasks] = useState([])
    const api = axios.create({
        withCredentials:true
    })
    const getTasks = ()=>{
        api.get('https://taskmate-8wpz.onrender.com/api/tasks').then((res)=>{
            console.log(res.data.tasks)
            settasks(res.data.tasks)
        }).catch((err)=>{
            console.log(err)
        })
    }
    useEffect(getTasks,[])
    return(
        <div className="flex flex-wrap gap-4 p-5">
            {
                task.length>0? (
                    task.map((ele)=>(
                        <TaskCard task={ele}/>
                    ))
                ):(<a>No task available😐</a>)
            }
        </div>
    )
}

export default TaskList