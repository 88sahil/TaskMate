import React from "react";
import {useForm} from 'react-hook-form'
import './Components.css'
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const Resetpass = ()=>{
    const {handleSubmit,register} = useForm()
    const navigate = useNavigate()
    const {token} = useParams()
    const api = axios.create({
        withCredentials:true
    })
    const resetpass = (data)=>{
        api.patch(`/api/user/resetpass/${token}`,data).then((res)=>{
            alert('passoword change successfully.please login')
            navigate('/login')
        }).catch((err)=>{
            console.log(err.response.data.msg)
        })
    }   
    return(
        <div className="forgot-main">
            <form onSubmit={handleSubmit(resetpass)} className="signup-form resetform">
                <h3>Conform Passoword</h3>
                <div className="su-div1">
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" className="signup-input" placeholder="********" {...register("password",{
                    required:true
                    })}/>
                    </div>
                    <div className="su-div1">
                    <label htmlFor="conformpassword">Conform Password:</label>
                    <input type="password" name="conformpassword" className="signup-input" placeholder="********" {...register("conformpassword",{
                    required:true
                    })}/>
                 </div>
                <button type="submit">ResetPass</button>
            </form>
        </div>
    )
}
export default Resetpass