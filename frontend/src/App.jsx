import { useEffect, useState } from 'react'
import axios from 'axios'
import { Outlet, useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { login } from './store/AuthSlice'
import './App.css'
function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [fetched,setfetched] = useState(false)
  const api = axios.create({
    withCredentials:true
  })
  const getuser =async()=>{
      try{
        const res =await axios.get("https://taskmate-8wpz.onrender.com/api/user/verify",{withCredentials:true})
        if(res.data){
          dispatch(login(res.data.user))
          setfetched(true)
          navigate('/Home/overview')
        }else{
          navigate('/login')
        }
      }catch(err){
        navigate('/login')
      }
  }
  useEffect(()=>{
      getuser()
  },[])
  return (
    <>
      {fetched?( <Outlet/>):(<div className="loader"></div>)}
    </>
  )
  }

export default App
