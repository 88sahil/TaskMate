import React, { useState } from "react";
import {useForm} from 'react-hook-form'
import './Components.css'
import axios from "axios";
const Forgot=()=>{
    const [msg,setmsg] = useState('')
    const {handleSubmit,register} = useForm()
    const api = axios.create({
        withCredentials:true
    })
    const getresettoken=(data)=>{
            api.post('/api/user/forgotpass',data).then((res)=>{
                    alert('check mail link sent successfully')
            }).catch((err)=>{
                alert(err.data.message)
            })
    }
    return(
        <div className="forgot">
            <form className="forgot-form" onSubmit={handleSubmit(getresettoken)}>
                <input type='email' name="email" className="signup-input" placeholder="enter your Email" {...register("email",{
                    required:true
                })}></input>
                <button type="submit">ForgotPassword</button>
                <a>{msg}</a>
            </form>
        </div>
    )
}

export default Forgot