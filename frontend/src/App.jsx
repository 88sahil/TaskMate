import { useEffect, useState } from 'react'
import axios from 'axios'
import SignUp from '../components/signup'
import Login from '../components/Login'
function App() {
  const [message,setmessage] = useState('')
  return (
    <>
    <SignUp />
    <Login/>
      <a>{message}</a>
    </>
  )
}

export default App
