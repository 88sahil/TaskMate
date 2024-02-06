 const express = require('express')
const App = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const User = require('./Routes/userRoute')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const router = require('./service/photoupload')
const GlobalErrorHandle = require('./Utils/GlobalErrorHanlde')
const project = require('./Routes/projectRoute')
const TaskR = require('./Routes/TaskRoute')

App.use(express.json({max:'10kb'}))
App.use(cors({
    credentials:true,
    origin:["https://taskmates.netlify.app","https://task-mate-nine.vercel.app"],
    optionsSuccessStatus:200
}))
App.use(cookieParser())
//start
dotenv.config({path:'./config.env'})
//database connection
const db = process.env.DB_URL.replace('<password>',process.env.Db_Pass)
mongoose.connect(db).then((con)=>{
    console.log("database connect successfully")
}).catch((err)=>{
    console.log(err.message)
}) 
//erro handle middleware
//main routes
App.use('/api/user',User)
App.use('/api/projects',project)
App.use('/api/tasks',TaskR)
App.use('/',router)    
App.get('/api/Logout',(req,res,next)=>{
    try{
        const cookieOption = {
            expires:new Date(Date.now()+process.env.cookie_expires* 24*60*60*1000),
            httpOnly:true
         } 
        res.cookie("jwt","",cookieOption)
        req.user = ""
        res.status(200).json({
            status:'success',
            msg:'logged out'
        })
    }catch(err){
        res.status(400).json({
            status:'fail',
            msg:err.message
        })
    }})
//server
App.use(GlobalErrorHandle)
const port = process.env.PORT || 3000
App.listen(port,()=>{
    console.log(`someone is looking for you at localhost:${port}`)
})
