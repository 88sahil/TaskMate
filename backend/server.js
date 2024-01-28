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
//main routes
App.use('/api/user',User)
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
    failureRedirect:'http://localhost:8000/Login'
}))
App.get('/getuser',function(req,res){
    if(req.user){
        res.status(200).json({
            message:'success',
            user:req.user
        })
    }else{
        res.status(400).json({
            message:'fail'
        })
    }
})
//server
const port = process.env.PORT || 3000
App.listen(port,()=>{
    console.log(`someone is looking for you at localhost:${port}`)
})