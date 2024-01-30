const Projects = require('../Models/ProjectModel')
const {checkasync} = require('./userControllers')
const AppError = require('../Utils/Error')


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
        status:'success',
        project
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





//exports modules

module.exports = {createProject,getProjects}