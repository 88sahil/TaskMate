import React, { useState } from "react";
import './Components.css'
import { useForm } from "react-hook-form";
import axios from "axios";
import Logo from "./Logo/Logo";
import google from '../assets/image/google.png'
import {useNavigate,Link} from 'react-router-dom'
import { useDispatch } from "react-redux";
import { login } from "../store/AuthSlice";
const Login = () =>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [message,setmessage] = useState('')
    const {handleSubmit,register} = useForm()
    const LoginUser = (data)=>{
        const api = axios.create({
            withCredentials:true
        })
        const url = 'http://localhost:3000/api/user/login'
        api.post(url,data).then((res)=>{
            dispatch(login(res.data.user))
            navigate('/Home/overview')
        }).catch((err)=>{
            alert(err.response.data.message)
        })
    }
    const googleLogin=()=>{
        window.open("http://localhost:3000/auth/google/callback","_self")
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
            <Link to="/forgotPassword"><a>Forgot Password?</a></Link>
            <p>-OR-</p>
            <div className="google">
                <button onClick={googleLogin}><img src={google} alt="google" /><a>SIGNIN WITH GOOGLE</a></button>
            </div>
       </form>
        </div>
      </div>
    )
}
export default Login