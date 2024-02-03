const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'task must have name']
    },
    discription:String,
    from:Date,
    to:Date,
    progress:{
        type:String,
        default:'created',
        enum:['created','in progress','completed']
    },
    author:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    team:[{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    }],
    project:{
        type:mongoose.Schema.ObjectId,
        ref:'Projects'
    }
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})

taskSchema.pre(/^find/,function(){
    this.populate({
        path:'author',
        select:'name photo email'
    }).populate({
        path:'team',
        select:'name photo email'
    })
})

const Tasks = mongoose.model("Tasks",taskSchema)

module.exports = Tasks