const express= require('express')
const project = express.Router()
const {protected} = require('../Controllers/userControllers')
const {createProject,getProjects,DeleteProject,AddTeam,DeleteTeam,AddTag,RemoveTag,getProject} = require('../Controllers/projectController')

project.route('/').post(protected,createProject).get(protected,getProjects)
//id route
project.route('/:projectid').delete(DeleteProject).get(getProject)
project.route('/addteam/:projectid').patch(AddTeam)
project.route('/deleteteam/:projectid').patch(DeleteTeam)
project.route('/addtag/:projectid').patch(AddTag)
project.route('/removetag/:projectid').patch(RemoveTag)

module.exports = project