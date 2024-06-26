const Projects = require('../Models/ProjectModel')
const {checkasync} = require('./userControllers')
const AppError = require('../Utils/Error')
const Tasks = require('../Models/TaskModel')

//create project
const createProject = checkasync(async(req,res,next)=>{
    if(!req.user){
        return next(new AppError('please login!',400))
    }
    const project = await Projects.create(req.body)
    if(!project){
        return next(new AppError('there is error in create project',500))
    }
    project.author = req.user._id
    await project.save()

    res.status(201).json({
        status:'success'
    })
})
//get projects
const getProjects = checkasync(async(req,res,next)=>{
    if(!req.user){
        return next(new AppError('please Login!',500))
    }
    const projects = await Projects.find({$or:[{author:req.user._id},{team:{$in:[req.user._id]}}]})
    if(projects.length<1){
        return next(new AppError('no project found!',404))
    }
    res.status(200).json({
        status:'success',
        projects
    })
})
//delete project
const DeleteProject = checkasync(async(req,res,next)=>{
    const id = req.params.projectid
    const deleteproject = await Projects.findByIdAndDelete(id)
    if(!deleteproject){
        return next(new AppError('cant delete project'),400)
    }  
    const taks = await Tasks.deleteMany({project:id})
    //have to delete all tasks belong to this project after taskmodeling
    res.status(200).json({
        status:'success'
    })
})
//insert team
const AddTeam = checkasync(async(req,res,next)=>{
    const id = req.params.projectid
    const {userId} = req.body
    const project = await Projects.findByIdAndUpdate(id,{$push:{team:userId}},{new:true})
    if(!project){
        return next(new AppError('cant able to update',500))
    }
    res.status(200).json({
        status:'success'
    })
})
//delete team in array
const DeleteTeam = checkasync(async(req,res,next)=>{
    const id = req.params.projectid
    const {userID} = req.body
    console.log(userID)
    const project = await Projects.findByIdAndUpdate(id,{$pull:{team:userID}},{new:true})
    if(!project){
        return next(new AppError('cant able to delete team member'),500)
    }
    res.status(200).json({
        status:'success'
    })
})
//insert tags
const AddTag = checkasync(async(req,res,next)=>{
    const id = req.params.projectid
    const {tag} = req.body

    const project = await Projects.findByIdAndUpdate(id,{$push:{tags:tag}},{new:true})
    if(!project){
        return next(new AppError("can't able to add tag",500))
    }
    res.status(200).json({
        status:'succes'
    })
})
//delete tag
const RemoveTag = checkasync(async(req,res,next)=>{
    const id = req.params.projectid
    const {tag} = req.body

    const project = await Projects.findByIdAndUpdate(id,{$pull:{tags:tag}},{new:true})
    if(!project){
        return next(new AppError("can't able to Remove tag",500))
    }
    res.status(200).json({
        status:'succes'
    })
})
//get single project
const getProject = checkasync(async(req,res,next)=>{
    const {projectid} = req.params
    const project =await Projects.findById(projectid).populate('task')
    if(!project){
        return next(new AppError('no any project available fot this id',404))
    }

    res.status(200).json({
        status:'success',
        project
    })
})
//exports modules
module.exports = {createProject,getProjects,DeleteProject,AddTeam,DeleteTeam,AddTag,RemoveTag,getProject}