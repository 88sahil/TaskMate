import { useEffect, useState } from 'react'
import axios from 'axios'
function App() {
  const [message,setmessage] = useState('')
  useEffect(()=>{
     
  })
  return (
    <>
      <a>{message}</a>
    </>
  )
}

export default App
