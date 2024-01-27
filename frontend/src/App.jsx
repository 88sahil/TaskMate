import { useEffect, useState } from 'react'
import axios from 'axios'
function App() {
  const [message,setmessage] = useState('')
  useEffect(()=>{
     const fetchdata =async()=>{
        const ms = await axios.get('/api/message')
        setmessage(ms.data.message)
     }
     fetchdata()
  })
  return (
    <>
      <a>{message}</a>
    </>
  )
}

export default App
