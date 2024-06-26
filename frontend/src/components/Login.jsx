import React, { useState } from "react";
import './Components.css'
import { useForm } from "react-hook-form";
import axios from "axios";
import Logo from "./Logo/Logo";
import {useNavigate,Link} from 'react-router-dom'
import { useDispatch } from "react-redux";
import { login } from "../store/AuthSlice";
const Login = () =>{
    const [loader,setloader] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [message,setmessage] = useState('')
    const {handleSubmit,register} = useForm()
    const LoginUser = (data)=>{
        setloader(false)
        const api = axios.create({
            withCredentials:true
        })
        const url = 'https://taskmate-8wpz.onrender.com/api/user/login'
        api.post(url,data).then((res)=>{
            dispatch(login(res.data.user))
            setloader(false)
            navigate('/Home/overview')
        }).catch((err)=>{
            alert(err.response.data.message)
            setloader(false)
        })
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
                    <button onClick={()=>{
                        navigate('/signup')
                    }}>Go TO SignUp</button>
            </div>
        </div>
         <form onSubmit={handleSubmit(LoginUser)} className="signup-form">
            <div className="loginLogo">
                <Logo/>
            </div>
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
            <span className="authnav">New User? <Link to="/signup" className="font-bold text-blue-700">Signup</Link></span>
            <Link to="/forgotPassword"><a>Forgot Password?</a></Link>
       </form>
        </div>
        {loader && <div className="loader"></div>}
      </div>
    )
}
export default Login