import { useEffect, useState } from 'react'
import axios from 'axios'
import SignUp from '../components/signup'
function App() {
  const [message,setmessage] = useState('')
  useEffect(()=>{
     const finduser = async()=>{
        const User = await axios.get('/api/user/verify')
        if(User){
          console.log(User)
        }else{
          setmessage("sorry")
        }
     }
     finduser()
  },[])
  return (
    <>
    <SignUp />
      <a>{message}</a>
    </>
  )
}

export default App
