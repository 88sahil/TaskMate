import { useEffect, useState } from 'react'
import axios from 'axios'
import SignUp from '../components/signup'
function App() {
  const [message,setmessage] = useState('')
  return (
    <>
    {/* <SignUp /> */}
      <a>{message}</a>
    </>
  )
}

export default App
