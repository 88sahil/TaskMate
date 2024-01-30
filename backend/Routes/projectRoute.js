const express= require('express')
const project = express.Router()
const {protected} = require('../Controllers/userControllers')
const {createProject,getProjects} = require('../Controllers/projectController')

project.route('/').post(protected,createProject).get(protected,getProjects)

module.exports = project