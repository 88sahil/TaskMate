import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
const SignUp = () =>{
    const {handleSubmit,register} = useForm()
    const [error,seterror] = useState('')

    const RegisterUser = async(data)=>{
        const url = "http://localhost:3000/api/user/signup"
        try{
            const user = await axios.post(url,data)
            console.log(user)
        }catch(err){
            seterror(err.message)
        }
        
    }
    return(
       <form onSubmit={handleSubmit(RegisterUser)} className="">
            <input type="email" name="email" id="Email" placeholder="enter email" {...register("email",{
                required:true
            })}/>
            <input type="text" name="user" id="user" placeholder="enter name" {...register("name",{
                required:true
            })} />

            <input type="password" name="password" id="" {...register("password",{
                required:true
            })}/>
            <input type="password" name="conformpassword" id="" {...register("conformpassword")}/>
            <button type="submit">Register</button>
       </form>

    )
}

export default SignUp