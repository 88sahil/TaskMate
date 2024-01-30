const express = require('express')
const App = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const User = require('./Routes/userRoute')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const userschema = require('./Models/UserModel')
const {promisify} = require('util')
const jwt = require('jsonwebtoken')
const router = require('./service/photoupload')
const GlobalErrorHandle = require('./Utils/GlobalErrorHanlde')
const project = require('./Routes/projectRoute')
App.use(express.json({max:'10kb'}))
App.use(cors({
    credentials:true,
    origin:'http://localhost:8000'
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
App.use('/',router)
//google auth
App.use(session({
    secret:"158965aaad4e8e6d6d6d6d",
    resave:false,
    saveUninitialized:true
}))
App.use(passport.initialize())
App.use(passport.session())
passport.use(
    new GoogleStrategy({
        clientID:"98064630254-vo34salt9rbm97vsact4hsu1dtviult6.apps.googleusercontent.com",
        clientSecret:"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",
        callbackURL:'/auth/google/callback',
        scope:['profile','email']
    },
    async(accesstoken,refreshtoken,profile,done)=>{
        try{
            let user = await userschema.findOne({googleID:profile.id})
            if(!user){
                user = userschema.create({
                    googleID:profile.id,
                    email:profile.emails[0].value,
                    photo:profile.photos[0].value,
                    password:profile.id,
                    conformpassword:profile.id,
                    name:profile.displayName,
                })
            }
            return done(null,user)
        }catch(err){
            console.log(err)
            return done(err,null)
        }
    }
    )
)
passport.serializeUser((user,done)=>{
    done(null,user)
})
passport.deserializeUser((user,done)=>{
    done(null,user)
})
//initialize google auth

App.get('/auth/google',passport.authenticate("google",{scope:["profile","email"]}))
App.get('/auth/google/callback',passport.authenticate('google',{
    successRedirect:'http://localhost:8000/',
    failureRedirect:'http://localhost:8000/login'
}))
App.get('/getuser',async function(req,res){
    try{
        if(!req.user){
         let token = req.cookies.jwt
         if(!token){
             throw new Error('no token available')
         }
         //find user
         const decoded = await promisify(jwt.verify)(token,process.env.token_secret)
         if(!decoded){
             throw new Error('Invalid Token')
         }
         const user =await userschema.findById(decoded.id);
         if(!user){
             throw new AppError("can't find user")
         }
         //password changeAt
         const isChange = user.changepassword(decoded.iap)
         if(isChange){
             throw new Error('password changed')
         }
 
         res.status(200).json({
             status:'success',
             user:user
         })
        }else{
         if(req.user){
             console.log(req.user)
             res.status(200).json({
                 message:'success',
                 user:req.user
             })
         }else{
             res.status(400).json({
                 message:'fail'
             })
         }
        }
     }catch(err){
         res.status(404).json({
             status:'fail',
             message:err.message
         })
     }
})
App.get('/Logout',(req,res,next)=>{
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