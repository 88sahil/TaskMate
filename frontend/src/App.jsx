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
      let url ='https://taskmate-8wpz.onrender.com/api/user/verify'
      api.get(url).then((res)=>{
      console.log(res)
      dispatch(login(res.data.user))
      navigate('/Home/overview')
    }).catch((err)=>{
      console.log(err)
        navigate('/login')
    })
  },[])
  return (
    <>
      <Outlet/>
    </>
  )
  }

export default App
