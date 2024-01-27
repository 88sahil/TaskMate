const express = require('express')
const App = express()
const dotenv = require('dotenv')

dotenv.config({path:'./config.env'})
App.get('/api/message',(req,res)=>{
    res.status(200).json({
        status:'success',
        message:'sahi pakde hai bhidu'
    })
})




//server
const port = process.env.PORT || 3000
App.listen(port,()=>{
    console.log(`someone is looking for you at localhost:${port}`)
})