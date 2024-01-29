import React from "react";
import {useForm} from 'react-hook-form'
import { Link } from "react-router-dom";
import '../Components.css'
import axios from "axios";
const ChangePassword =()=>{
    const {handleSubmit,register} = useForm()
    const api = axios.create({
        withCredentials:true
    })
    const changepass=(data)=>{
        api.patch('http://localhost:3000/api/user/updatepass',data).then((res)=>{
            alert('password changed successFully')
        }).catch((err)=>{
            alert('sorry some error occurs')
            console.log(err)
        })
    }
    return(
        <div className="cpass">
            <form onSubmit={handleSubmit(changepass)} className="signup-form">
            <h3>Update Password</h3>
            <div className="su-div1">
                <label htmlFor="oldpass">Old Password:</label>
                <input type="password" name="oldpass" className="signup-input" placeholder="********" {...register("oldpassword",{
                required:true
            })}/>
           </div>
            <div className="su-div1">
                <label htmlFor="password">New Password:</label>
            <input type="password" name="password" className="signup-input" placeholder="********" {...register("newpassword",{
                required:true
            })}/>
            </div>
            <div className="su-div1">
                <label htmlFor="password">Conform Password:</label>
            <input type="password" name="conformpassword" className="signup-input" placeholder="********" {...register("conformnewpass",{
                required:true
            })}/>
            </div>
            <button type="submit">Update Password</button>
            <Link to="/forgotPassword"><a>Forgot Password?</a></Link>
        </form>
        </div>
    )
}

export default ChangePassword   