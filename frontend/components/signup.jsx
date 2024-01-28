import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Logo from "./Logo/Logo";
import './Components.css'
const SignUp = () =>{
    const api = axios.create({
        withCredentials:true
    })
    const {handleSubmit,register} = useForm()
    const [error,seterror] = useState('')

    const RegisterUser =(data)=>{
        const url = "http://localhost:3000/api/user/signup"
        api.post(url,data).then((res)=>{
            console.log(res)
        }).catch((err)=>{
            seterror(err.response.data.msg)
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
                    <a>Already have account?</a>
                    <button>Go TO Login</button>
            </div>
        </div>
         <form onSubmit={handleSubmit(RegisterUser)} className="signup-form">
            <h3>Get Start with The free account</h3>
           <div className="su-div1">
            <label htmlFor="email">Email:</label>
           <input type="email" name="email" className="signup-input" placeholder="enter email" {...register("email",{
                required:true
            })}/>
           </div>
            <div className="su-div1">
                <label htmlFor="user">Name:</label>
            <input type="text" name="user" id="user" className="signup-input" placeholder="enter name" {...register("name",{
                required:true
            })} />
            </div>
            <div className="su-div1">
                <label htmlFor="password">Password:</label>
            <input type="password" name="password" className="signup-input" placeholder="********" {...register("password",{
                required:true
            })}/>
            </div>
            <div className="su-div1">
            <label htmlFor="conformpassword">ConformPassword:</label>
            <input type="password" name="conformpassword" className="signup-input" placeholder="********" {...register("conformpassword")}/>
            </div>
            <button type="submit">Register</button>
            <a>{error}</a>
       </form>
        </div>
      </div>

    )
}

export default SignUp