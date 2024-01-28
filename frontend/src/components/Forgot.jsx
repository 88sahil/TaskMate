import React, { useState } from "react";
import {useForm} from 'react-hook-form'
import './Components.css'
const Forgot=()=>{
    const [msg,setmsg] = useState('')
    const {handleSubmit,register} = useForm()
    return(
        <div className="forgot">
            <form className="forgot-form">
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