const express = require('express')
const User = express.Router()
const {createUser,userLogin} = require('../Controllers/userControllers.js')
User.route('/').post(createUser)
User.route('/login').post(userLogin)


module.exports = User