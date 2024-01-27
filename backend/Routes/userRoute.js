const express = require('express')
const User = express.Router()
const {createUser,userLogin,verifyUser} = require('../Controllers/userControllers.js')
User.route('/signup').post(createUser)
User.route('/login').post(userLogin)
User.route('/verify').get(verifyUser)

module.exports = User