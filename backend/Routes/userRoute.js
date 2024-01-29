const express = require('express')
const User = express.Router()
const {createUser,userLogin,verifyUser,forgotpassword, resetpassword} = require('../Controllers/userControllers.js')
User.route('/signup').post(createUser)
User.route('/login').post(userLogin)
User.route('/verify').get(verifyUser)
User.route('/forgotpass').post(forgotpassword)
User.route('/resetpass/:token').patch(resetpassword)
module.exports = User