import React, { useState } from "react";
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
    const [Loader,setLoader] = useState(false)
    const uploadFile =(data)=>{
        setLoader(true)
        const image = {
            "avatar":data.avatar[0]
        }
        api.post('/api/upload',image,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        }).then((res)=>{
            dispatch(login(res.data.data))
            setLoader(false)
        }).catch((err)=>{
            setLoader(false)
            alert('error')
        })
    }
    return(
        <div className="userpage">
        <div>
            <img src={user.photo}></img>
        </div>
        <form onSubmit={handleSubmit(uploadFile)} className="updateForm">
            <label for="file-input" class="custom-file-input">
                <span class="file-input-text">Choose File</span>
                <input type="file" name="profile" id="file-input" class="file-input-field" accept="image/*"  {...register("avatar",{
                 required:true
                    })}/>
            </label>
          
            <div className="userpage updateBtn">
                <button type="submit">Upload</button>
            </div>
        </form>
        {Loader && <div class="loader"></div>}
        </div>
    )
}
export default UpdateUser