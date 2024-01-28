const User = require('../Models/UserModel.js')
const jwt = require('jsonwebtoken')
const {promisify} = require('util')
// const checkaync = fn =>{
//     return (req,res,next)=>{
//         fn(req,res,next).catch(next)
//     }
// }

const createSignInToken = (id) =>{
    let token = jwt.sign({id:id},process.env.token_secret,{
        expiresIn:process.env.token_expire
    })
    return token
}
//cookie
const createsignIn =(user,statuscode,res)=>{
    const token = createSignInToken(user._id)
    const cookieOption = {
        expires:new Date(Date.now()+process.env.cookie_expires* 24*60*60*1000),
        httpOnly:true
     } 
    res.cookie("jwt",token,cookieOption)
        res.status(statuscode).json({
            status:'success',
            token,
            user
        })
    
}
//signUp
const createUser = async(req,res,next)=>{
    try{
        const user = await User.create(req.body)
       
        //cookie option'
         
        createsignIn(user,201,res)
        
    }catch(err){
        res.status(500).json({
            status:'fail',
            msg:err.message
        })
    }
}
const userLogin = async(req,res,next)=>{
    try{
        const {email,password} = req.body
        if(!email || !password){
            throw new Error('please enter email or password')
        }
    //find user
    const user = await User.findOne({email:email}).select('+password')
    if(!user){
        throw new Error("no user found")
    }
    //compare password
    let correct =await user.comparePassword(password,user.password)
    if(!correct){
        throw new Error('password is not same')
    }
    createsignIn(user,200,res)
    }catch(err){
        res.status(500).json({
            status:'fail',
            message:err.message
        })
    }
}
const verifyUser = async(req,res,next)=>{
    try{
       if(!req.user){
        console.log("hello")
        let token = req.cookies.jwt
        if(!token){
            throw new Error('no token available')
        }
        //find user
        const decoded = await promisify(jwt.verify)(token,process.env.token_secret)
        if(!decoded){
            throw new Error('Invalid Token')
        }
        const user =await User.findById(decoded.id);
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
            data:user
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
}
const protected = async(req,res,next)=>{
   try{
    //get token
    let token;
        if(req.headers.authorization || req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }else if(req.cookie.jwt){
            token = req.cookie.jwt
        }
        if(!token){
            throw new Error('no token available')
        }
        //find user
        const decoded = await promisify(jwt.verify)(token,process.env.token_secret)
        if(!decoded){
            throw new Error('Invalid Token')
        }
        const user =await User.findById(decoded.id);
        if(!user){
            throw new AppError("can't find user")
        }
        //password changeAt
        const isChange = user.changepassword(decoded.iap)
        if(isChange){
            throw new Error('password changed')
        }
        req.user = user
       next()
   }catch(err){
        res.status(500).json({
            status:'fail',
            msg:err.message
        })
   }
}
module.exports = {createUser,userLogin,verifyUser}


//login
