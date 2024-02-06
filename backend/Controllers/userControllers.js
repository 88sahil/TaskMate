const User = require('../Models/UserModel.js')
const jwt = require('jsonwebtoken')
const {promisify} = require('util')
const crypto = require('crypto')
const Email = require('../Utils/Email.js')
const AppError = require('../Utils/Error.js')
// const checkaync = fn =>{
//     return (req,res,next)=>{
//         fn(req,res,next).catch(next)
//     }
// }
const checkasync = fn =>{
    return (req,res,next)=>{
        fn(req,res,next).catch(next)
    }
}
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
        httpOnly:true,
        secure:true,
        sameSite:'none'
     } 
    res.cookie("jwt",token,cookieOption)
        res.status(statuscode).json({
            status:'success',
            token,
            user
        })
    
}
//signUp
const createUser = checkasync(async(req,res,next)=>{
        const user = await User.create(req.body)
       
        //cookie option'
         
        createsignIn(user,201,res)
})
const userLogin = checkasync(async(req,res,next)=>{
        const {email,password} = req.body
        if(!email || !password){
            return next(new AppError('please provide password',400))
        }
    //find user
    const user = await User.findOne({email:email}).select('+password')
    if(!user){
        return next(new AppError('no user found',404))
    }
    //compare password
    let correct =await user.comparePassword(password,user.password)
    if(!correct){
        return next(new AppError("incorrect password"),400)
    }
    createsignIn(user,200,res)
})
const verifyUser =checkasync (async(req,res,next)=>{
        let token = req.cookies.jwt
        if(!token){
            return next(new AppError('no token available',404))
        }
        //find user
        const decoded = await promisify(jwt.verify)(token,process.env.token_secret)
        if(!decoded){
           return next(new AppError('Invalid Token',500))
        }
        const user =await User.findById(decoded.id);
        if(!user){
            return next(new AppError('no user Found',404))
        }
        //password changeAt
        const isChange = user.changepassword(decoded.iap)
        if(isChange){
            return next(new AppError('password changed',400))
        }

        res.status(200).json({
            status:'success',
            user:user
        })
       })
const forgotpassword = checkasync(async(req,res,next)=>{
        const email = req.body.email
         if(!email){
                return next(new AppError('please provide password',404))
            }
             const user = await User.findOne({email:email})
             if(!user){
                return next(new AppError('no user found',404))
             }
             if(user.googleID){
                return next(new AppError('please login through Googele'))
             }
             const resettoken = user.createResetToken()
             await user.save({validateBeforeSave:false})
             const requrl = `${req.protocol}:/localhost:8000/resetpass/${resettoken}`
             await new Email(user,requrl).sendPasswordReset()
             res.status(200).json({
                status:'success',
                msg:'email send successfully'
             })
    }
)
const resetpassword=checkasync(async(req,res,next)=>{
     //take token from req
     const {token} = req.params
     const {password,conformpassword} = req.body
     if(!password || !conformpassword){
         return next(new AppError('please provide data complete',404))
     }
     //get reset token and find user
     const resettoken = crypto.createHash('sha256').update(token).digest('hex')
     //find user
     const user = await User.findOne({passwordresetToken:resettoken,tokenexpries:{$gt:Date.now()}})
     if(!user){
         return next(new AppError('no user Found',404))
     }
     user.password = password
     user.conformpassword = conformpassword
     user.passwordresetToken = undefined
     user.tokenexpries = undefined
     await user.save({})
     res.status(200).json({
        status:'success',
        msg:'password changed successfully'
     })

   })
const protected = checkasync(async(req,res,next)=>{
    //get token
    let token;
        if(req.cookies.jwt){
            token = req.cookies.jwt
        }
        if(token.length===0){
            return next(new AppError('please Login',500))
        }
        //find user
        const decoded = await promisify(jwt.verify)(token,process.env.token_secret)

        if(!decoded){
            return next(new AppError('Invalid Token',400))
        }
        const user =await User.findById(decoded.id);
        if(!user){
            return next(new AppError('no user found!',404))
        }
        //password changeAt
        const isChange = user.changepassword(decoded.iap)
        if(isChange){
            return next(new AppError('password changed',500))
        }
        req.user = user
       next()
   })
const changepass = checkasync( async(req,res,next)=>{
     //get id from req.user
     const id = req.user._id
     //get oldpass and new pass
     const {oldpassword,newpassword,conformnewpass} = req.body
     //get user
     const user = await User.findById(id).select('+password')
     if(!user){
        return next(new AppError('no user Found!',404))
     }
     const isCorrect = user.comparePassword(oldpassword,user.password)
     if(!isCorrect){
        return next(new AppError('incorrect old Password!'))
     }
     user.password = newpassword
     user.conformpassword = conformnewpass
     user.passwordChangeAt= Date.now()
     await user.save()
     let token = createSignInToken(user._id)
     const cookieOption = {
        expires:new Date(Date.now()+process.env.cookie_expires* 24*60*60*1000),
        httpOnly:true
     } 
     res.cookie("jwt",token,cookieOption)
     res.status(200).json({
        status:'sucess',
        msg:'password changed successfully'
     })
   })
const logout =(req,res,next)=>{
    try{
        const cookieOption = {
            expires:new Date(0),
            httpOnly:true,
            secure:true,
            sameSite:"none"
         } 
        res.cookie("jwt","",cookieOption)
        req.user = null
        res.redirect('/')
        res.status(200).json({
            status:'success',
            msg:'logged out'
        })
    }catch(err){
        res.status(400).json({
            status:'fail',
            msg:err.message
        })
    }
}
//find user by email
const FindUser = checkasync(async(req,res,next)=>{
    const {email} = req.body
    const user = await User.findOne({email:email}).select('name email photo')
    if(!user){
        return next(new AppError('no user Found!',404))
    }
    res.status(200).json({
        user
    })
})
module.exports = {createUser,userLogin,verifyUser,forgotpassword,resetpassword,protected,changepass,logout,checkasync,FindUser}


//login
