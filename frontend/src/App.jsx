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
  const getUser =()=>{
    api.get('/api/user/verify').then((res)=>{
     dispatch(login(res.data.user))
     navigate('/Home/overview')
    }).catch((err)=>{
      console.log(err)
        navigate('/login')
    })
   
    }
  useEffect(()=>{
    getUser()
  },[])
  return (
    <>
      <Outlet/>
    </>
  )
  }

export default App
