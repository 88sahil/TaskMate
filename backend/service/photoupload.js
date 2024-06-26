const express = require('express')
const {cloudFile, deleteFile}= require('../Utils/FileUpload')
const router = express.Router()
const upload = require('../middleware/multer')
const User = require('../Models/UserModel')
const fs = require('fs')
const {protected} = require('../Controllers/userControllers')
router.post('/api/upload',protected,upload,async function(req,res){
        try{
            const response =await cloudFile(req.file.path)
            const user = await User.findById(req.user._id)
            if(user.photoid){
                let deleteFiles = await deleteFile(user.photoid);
            }
            user.photo = response.url
            user.isPhotoChange=true
            user.photoid = response.public_id
            await user.save()
            fs.unlinkSync(req.file.path)
            res.status(200).json({
                status:'success',
                data:user
            })
        }catch(err){
            res.status(400).json({
                status:'fail',
                msg:err.message
            })
        }
})

module.exports = router