const handleDev = (err,res)=>{
    res.status(err.statuscode).json({
        status:err.status,
        message:err.message,
        stack:err.stack
    })
}
const GlobalErrorHandle = (err,req,res,next)=>{
    err.statuscode = err.statusCode || 400
    err.status = err.status || fail
    if(process.env.NODE_ENV==="development"){
        handleDev(err,res)
    }
}

module.exports = GlobalErrorHandle