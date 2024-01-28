import { useEffect, useState } from 'react'
import axios from 'axios'
import SignUp from './components/signup'
import Login from './components/Login'
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
    <div>
    <Login/>

    </div>
    <div>
        <img src={user.photo} alt="no photo" />
        <a href="">{user.name}</a>
      </div>
      <a>{message}</a>
    </>
  )
}

export default App
