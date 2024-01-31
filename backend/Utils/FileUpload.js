const cloudinary = require('cloudinary').v2       
cloudinary.config({ 
  cloud_name: 'dho1k0k5g', 
  api_key: '881525287337586', 
  api_secret: 'eyEHktdeOL8o-Dvu6WM0jSMJwjQ' 
});
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
const deleteFile =async (id)=>{
   try{
      if(!id) return null;
      let dfile = await cloudinary.uploader.destroy(id)
      return dfile
   }catch(err){
      return null
   }
}
module.exports = {cloudFile,deleteFile}
