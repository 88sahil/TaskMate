import { useEffect, useState } from 'react'
import axios from 'axios'
import SignUp from './components/signup'
import Login from './components/Login'
import LoginPage from './pages/LoginPage/LoginPage'
function App() {
  const [message,setmessage] = useState('')
  const [user,setuser] = useState({})
  const api = axios.create({
    withCredentials:true
  })
  const getUser = async()=>{
    const user = await api.get('http://localhost:3000/getuser')
    if(user){
      console.log(user)
      setuser(user.data.user)
    }else{
      console.log("nathi bhai")
    }
  }
  useEffect(()=>{
    getUser()
  },[])
  return (
    <>
    </>
  )
}

export default App
