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
        enum:['created','continue','completed']
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



const Tasks = mongoose.model("Tasks",taskSchema)

module.exports = Tasks