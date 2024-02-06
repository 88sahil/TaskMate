import React, { useEffect, useState } from "react";
import {useSelector} from 'react-redux'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {useForm} from 'react-hook-form'
import axios from 'axios'
import './Menu.css'
import ProjectCard from "./ProjectCard";
import Logo from "../Logo/Logo";
export const Condate = (dates)=>{
    let date = new Date(dates)
    date =`${date.getDate()} ${date.toLocaleDateString('en-us',{Date:'numeric',month:'long',year:'numeric'})}`
    return date
}
const HomeOver =()=>{
    const {handleSubmit,register} = useForm()
    const [showform,setshowform] = useState(false)
    const [Loader,setLoader] = useState(false)
    const [Projects,setProjects] = useState([])
    
    let user = useSelector((state)=>state.auth.UserData)
    const api =  axios.create({
        withCredentials:true
    })
    //get all project for user
    const getProjects =()=>{
        setLoader(true)
        api.get('/api/projects').then((res)=>{
            setProjects(res.data.projects)
            setLoader(false)
        }).catch((err)=>{
            console.log(err)
        })
    }
    //create project
    
    const createProject =(data)=>{
        setLoader(true)
        setshowform(false)
        api.post('https://taskmate-8wpz.onrender.com/api/projects/',data).then((res)=>{
            getProjects()
            setLoader(false)
        }).catch((err)=>{
            alert(err.data)
        })
    }
    useEffect(()=>{
        getProjects()
    },[])
    return(
        <div className="homeover">
            <div className="hodiv1">
                <a>Hello {user.name.split(' ')[0]}</a>
                <a id="calendarmonth"><CalendarMonthIcon/>{Condate(Date.now())}</a>
            </div>
            <div className="PoMain">
                <button onClick={()=>setshowform((prev)=>!prev,setLoader(false))}>AddProject <AddCircleIcon sx={{color:"white"}}/></button>
                {showform && <form className="projectform" onSubmit={handleSubmit(createProject)}>
                    <div className="frm1">
                        <label htmlFor="projectname">ProjectName:</label>
                        <input type="text" name="projectname" placeholder="eg.,TaskMate" {...register("name",{required:true})} required></input>
                    </div>
                    <div className="frm1">
                        <label htmlFor="Discription">Discription:</label>
                        <textarea name="Discription" placeholder="eg.,TaskMate is my fist project" rows="5" {...register("discription")}></textarea>
                    </div>
                    <div className="frm1">
                        <label htmlFor="Date" >DueTo:</label>
                        <input type="Date" name="Dueto" {...register("DueDate")}></input>
                    </div>
                    <div className="frm1">
                        <label htmlFor="priority">Priority:</label>
                        <select className="priority" name="priority" {...register("priority")}>
                            <option value="less" selected>less</option>
                            <option value="medium">medium</option>
                            <option value="most">Most</option>
                        </select>
                    </div>
                    <div className="formbuttons">
                        <button type="submit">Save</button>
                        <button onClick={()=>setshowform(false)}>Cancel</button>
                    </div>
                </form>}
                <div className="projectdata">
                    { Projects.length>0? 
                        Projects.slice(0,4).map((ele,index)=>{
                             return(
                                    <ProjectCard ele={ele} index={index}/>
                             )
                        }): (
                            <div>No record found!</div>
                        )
                    } 
                </div>
               {Loader && <div className="loader"></div>}
            </div>
        </div>
    )
}
export default HomeOver