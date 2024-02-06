const {checkasync} = require('./userControllers')
const AppError = require('../Utils/Error')
const Tasks  = require('../Models/TaskModel')
const createTask = checkasync(async(req,res,next)=>{
    const {projectid} = req.params
    const task = await Tasks.create(req.body)
    if(!task){
        return next(new AppError("there is error to createtask",500))
    }
    task.author = req.user._id
    task.project = projectid
    await task.save()
    res.status(201).json({
        status:'success',
        task
    })
})
const GETtask = checkasync(async(req,res,next)=>{
    const id = req.params.id
    const task = await Tasks.findById(id)
    if(!task){
        return next(new AppError('no task found',404))
    }
    res.status(200).json({
        status:'success',
        task
    })
})
const deleteTaks = checkasync(async(req,res,next)=>{
    const id = req.params.id
    const task = await Tasks.findByIdAndDelete(id)
    if(!task){
        return next(new AppError('unable to delete',500))
    }
    res.status(200).json({
        message:"success"
    })
})

const addTaskTeam = checkasync(async(req,res,next)=>{
    const userId = req.body.userId
    const taskid = req.params.id
    const task = await Tasks.findByIdAndUpdate(taskid,{$push:{team:userId}})
    if(!task){
        return next(new AppError('unable to update',500))
    }
    res.status(200).json({
        status:'success'
    })
})

const getTasks = checkasync(async(req,res,next)=>{
    const id = req.user._id

    const tasks = await Tasks.find({$or:[{author:id},{team:{$in:[id]}}]})
    if(!tasks){
        return next(new AppError('no tasks found!',404))
    }
    res.status(200).json({
        status:'success',
        tasks,
        user:req.user
    })
})
const updateProgress = checkasync(async(req,res,next)=>{
        const id = req.params.id

        const task = await Tasks.findByIdAndUpdate(id,req.body,{new:true})
        if(!task){
            return next(new AppError('please provid valid data',500))
        }
        res.status(200).json({
            status:'success'
        })
})
module.exports = {createTask,addTaskTeam,deleteTaks,getTasks,GETtask,updateProgress}