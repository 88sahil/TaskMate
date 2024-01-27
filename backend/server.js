const express = require('express')
const App = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const User = require('./Routes/userRoute')
const cors = require('cors')
const cookieParser = require('cookie-parser')
App.use(express.json({max:'10kb'}))
App.use(cors())
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
App.get('/api/message',(req,res)=>{
    res.status(200).json({
        status:'success',
        message:'sahi pakde hai bhidu have na avto aaya barobr'
    })
})

//main routes
App.use('/api/user',User)

//server
const port = process.env.PORT || 3000
App.listen(port,()=>{
    console.log(`someone is looking for you at localhost:${port}`)
})