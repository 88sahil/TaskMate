const cloudinary = require('cloudinary').v2       
cloudinary.config({ 
  cloud_name: 'dho1k0k5g', 
  api_key: '881525287337586', 
  api_secret: 'eyEHktdeOL8o-Dvu6WM0jSMJwjQ' 
});
console.log(process.env.cloud_name)
const cloudFile = async(path)=>{
   try{
      if(!path) return null
        let respose = await cloudinary.uploader.upload(path,{
         resource_type:'auto'
         })
   return respose
   }catch(err){
      return err
   }
}
module.exports = cloudFile
