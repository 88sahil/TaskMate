const express= require('express')
const TaskR = express.Router({mergeParams:true})
const {createTask, deleteTaks, addTaskTeam, getTasks} = require('../Controllers/TaskController')
const {protected} = require('../Controllers/userControllers')
TaskR.route('/').post(protected,createTask).get(protected,getTasks)
TaskR.route('/:id').delete(protected,deleteTaks)
TaskR.route('/addTaskTeam/:id').patch(protected,addTaskTeam)
module.exports = TaskR