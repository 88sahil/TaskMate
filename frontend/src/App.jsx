import { useEffect, useState } from 'react'
import axios from 'axios'
import { Outlet, useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { login } from './store/AuthSlice'
import './App.css'
function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const api = axios.create({
    withCredentials:true
  })
  useEffect(()=>{
    try{
      api.get('https://taskmate-8wpz.onrender.com/api/user/verify').then((res)=>{
        console.log(res)
        dispatch(login(res.data.user))
        navigate('/Home/overview')
      }).catch((err)=>{
        console.log(err)
          navigate('/login')
      })
    }catch(err){
      navigate('/login')
    }
      
  },[])
  return (
    <>
      <Outlet/>
    </>
  )
  }

export default App
