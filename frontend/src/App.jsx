import { useEffect, useState } from 'react'
import axios from 'axios'
import { Outlet, useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { login } from './store/AuthSlice'
import { Link } from 'react-router-dom'
function App() {
  const [message,setmessage] = useState('')
  const dispatch = useDispatch()
  const [UserData,setuser] = useState({})
  const navigate = useNavigate()
  const api = axios.create({
    withCredentials:true
  })
  const getUser = async()=>{
    api.get('http://localhost:3000/getuser').then((res)=>{
     setuser(res.data.user)
     dispatch(login(res.data.user))
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
    <Link to="/DashBoard">Dashboard</Link>
      <Outlet/>
    </>
  )
  }

export default App
