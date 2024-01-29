import React from "react";
import {useForm} from 'react-hook-form'
import './dashboard.css'
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { login } from "../../store/AuthSlice";
const UpdateUser =()=>{
    const user = useSelector(state=>state.auth.UserData)
    const dispatch = useDispatch()
    const {handleSubmit,register} = useForm()
    const api = axios.create({
        withCredentials:true
    })
    const uploadFile =(data)=>{
        const image = {
            "avatar":data.avatar[0]
        }
        api.post('http://localhost:3000/upload',image,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        }).then((res)=>{
            dispatch(login(res.data.data))
        }).catch((err)=>{
            alert('error')
        })
    }
    return(
        <div className="userpage">
        <div>
            <img src={user.photo}></img>
        </div>
        <form onSubmit={handleSubmit(uploadFile)}>
            <label form="profile">Upload Picture: </label>
            <input type="file" name="profile" id="profile-ip" accept="image/*"  {...register("avatar",{
                required:true
            })}/>
             <div className="userpage">
            <button type="submit">Upload</button>
        </div>
        </form>
       
        </div>
    )
}
export default UpdateUser