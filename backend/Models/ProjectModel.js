const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    name:{
        type:String,
        require:[true,"project should have name"]
    },
    createAt:{
        type:Date,
        default:Date.now()
    },
    author:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    DueDate:Date,
    tags:[String],
    team:[{
            type:mongoose.Schema.ObjectId,
            ref:'User'
    }],
    status:{
        type:String,
        default:'continue'
    },
    priority:{
        type:String,
        default:'less',
        enum:['less','medium','most']
    },
    discription:String
},
{   toJSON:{virtuals:true},
    toObject:{virtuals:true}
})
projectSchema.pre(/^find/,function(next){
    this.populate({
        path:'author',
        select:'email name photo'
    }).populate({
        path:'team',
        select:'email name photo'
    })
    next()
})
const Project = mongoose.model('Projects',projectSchema)
module.exports = Project