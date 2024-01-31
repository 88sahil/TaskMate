const mongoose = require('mongoose')
const bycrypt = require('bcrypt')
const crypto = require('crypto')
const validator = require('validator')
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        require:[true,'please provide email'],
        trim:true,
        lowercase:true,
        validate(value) {
            if (!validator.isEmail(value)){
              throw new Error('Invalid email');
            }
        }
    },
    name:{
        type:String,
        require:[true,'please enter name']
    },
    password:{
        type:String,
        require:[true,'please Enter password'],
        select:false,
    },
    conformpassword:{
        type:String,
        require:[true,'please conform password'],
        validate:{
            validator:function(el){
                return el === this.password
            },
            message:"password isn't same"
        }
    },
    createAt:{
        type:Date,
        default:Date.now()
    },
    passwordChangeAt:Date,
    photo:{
        type:String,
        default:"https://imgs.search.brave.com/t_EO3diQ0lNqEI0BznGqzktsXdr8cd-_ABxoymHugIc/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4x/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvdXNlci1waWN0/dXJlcy8xMDAvbWFs/ZTMtNTEyLnBuZw"
    },
    photoid:String,
    active:{
        type:Boolean,
        default:true,
        select:false
    },
    isPhotoChange:{
        type:Boolean,
        default:false
    },
    passwordresetToken:String,
    tokenexpries:Date,
    googleID:String,
})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bycrypt.hash(this.password,12)
    this.conformpassword = undefined
    next()
})
userSchema.methods.comparePassword = async(candidatepassword,password)=>{
    return await bycrypt.compare(candidatepassword,password)
}
userSchema.methods.changepassword=function(jwttime){
    if(this.passwordChangeAt){
        const changeAt =  parseInt(this.passwordChangeAt.getTime()/1000,10)
        return jwttime<changeAt
    }
    return false;
}
userSchema.methods.createResetToken=function(){
    let resettoken = crypto.randomBytes(32).toString('hex')
    this.passwordresetToken = crypto.createHash('sha256').update(resettoken).digest('hex')
    this.tokenexpries = Date.now()+60*60*1000
    return resettoken;
}
const User = mongoose.model('User',userSchema)

module.exports = User