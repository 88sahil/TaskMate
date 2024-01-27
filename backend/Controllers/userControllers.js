const User = require('../Models/UserModel.js')
const jwt = require('jsonwebtoken')
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

//signUp
const createUser = async(req,res,next)=>{
    try{
        const user = await User.create(req.body)
        let token = createSignInToken(user._id)
        res.status(201).json({
            status:'sucess',
            token,
            message:'user created successfully',
            data:user
        })
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
    //find user
    const user = await User.findOne({email:email}).select('+password')
    if(!user){
        throw new Error("no user found")
    }
    //compare password
    let correct =await user.comparePassword(password,user.password)
    console.log(correct)
    if(!correct){
        throw new Error('password is not same')
    }
    let token = createSignInToken(user._id)
    res.status(200).json({
        status:'success',
        token
    })
    }catch(err){
        res.status(500).json({
            status:'fail',
            message:err.message
        })
    }
}

module.exports = {createUser,userLogin}


//login
