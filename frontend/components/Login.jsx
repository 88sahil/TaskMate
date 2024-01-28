import React, { useState } from "react";
import './Components.css'
import { useForm } from "react-hook-form";
import axios from "axios";
import Logo from "./Logo/Logo";
import google from '../'
const Login = () =>{
    const [message,setmessage] = useState('')
    const {handleSubmit,register} = useForm()
    const LoginUser = async(data)=>{
        const api = axios.create({
            withCredentials:true
        })
        const url = 'http://localhost:3000/api/user/login'
        const user = await api.post(url,data)
    }
    return(
        <div className="signuppage">
        <div className="main">
        <div className="div1">
            <div className="sub-div1">
                <Logo/>
            </div>
            <div className="sub-div2">
                    <a>new User?</a>
                    <button>Go TO SignUp</button>
            </div>
        </div>
         <form onSubmit={handleSubmit(LoginUser)} className="signup-form">
            <h3>Login User</h3>
           <div className="su-div1">
            <label htmlFor="email">Email:</label>
           <input type="email" name="email" className="signup-input" placeholder="enter email" {...register("email",{
                required:true
            })}/>
           </div>
            <div className="su-div1">
                <label htmlFor="password">Password:</label>
            <input type="password" name="password" className="signup-input" placeholder="********" {...register("password",{
                required:true
            })}/>
            </div>
            <button type="submit">Login</button>
            <div className="google">
                <button>SIGNIN WITH GOOGLE</button>
            </div>
       </form>
        </div>
      </div>
    )
}
export default Login