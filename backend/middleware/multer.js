const mutler = require('multer')
const {diskStorage} = require('multer')
const storage = diskStorage({
    filename: function (req, file, cb) {
        cb(null,file.originalname)
      }
})
const upload = mutler({
    storage
}).single('avatar')

module.exports = upload