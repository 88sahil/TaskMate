const mongoose = require('mongoose')
const bycrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        require:[true,'please provide email'],
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
    passwordChangeAt:Date,
    photo:{
        type:String,
        default:"https://imgs.search.brave.com/t_EO3diQ0lNqEI0BznGqzktsXdr8cd-_ABxoymHugIc/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4x/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvdXNlci1waWN0/dXJlcy8xMDAvbWFs/ZTMtNTEyLnBuZw"
    },
    active:{
        type:Boolean,
        default:true
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
        const changeAt =  parseInt(this.passwordChangeAt.getTIme()/1000,10)
        return jwt<changeAt
    }
    return false;
}
const User = mongoose.model('User',userSchema)

module.exports = User