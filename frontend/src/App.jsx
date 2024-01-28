import { useEffect, useState } from 'react'
import axios from 'axios'
import SignUp from './components/signup'
import Login from './components/Login'
import LoginPage from './pages/LoginPage/LoginPage'
import { useNavigate } from 'react-router-dom'
function App() {
  const [message,setmessage] = useState('')
  const [User,setuser] = useState({})
  const navigate = useNavigate()
  const api = axios.create({
    withCredentials:true
  })
  const getUser = async()=>{
    api.get('http://localhost:3000/getuser').then((res)=>{
     setuser(res.data.user)
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
    <div><img src={User.photo} alt="" /></div>
    </>
  )
  }

export default App
