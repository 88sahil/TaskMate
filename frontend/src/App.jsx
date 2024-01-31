import { useEffect, useState } from 'react'
import axios from 'axios'
import { Outlet, useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { login } from './store/AuthSlice'
import { Link } from 'react-router-dom'
function App() {
  const [message,setmessage] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const api = axios.create({
    withCredentials:true
  })
  const getUser =()=>{
    api.get('http://localhost:3000/getuser').then((res)=>{
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
