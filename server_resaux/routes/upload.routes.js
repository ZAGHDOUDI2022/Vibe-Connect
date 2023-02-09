const express = require('express')
const router = require('express').Router()
const multer = require('multer')
const path = require('path')

const storage=multer.diskStorage({
  destination:'../public/images',
  filename:function(req,file,cb){
      cb(null,file.fieldname+"-"+Date.now()+path.extname(file.originalname))
  }
})
const upload=multer({
  storage:storage,
  fileFilter:function(req,file,cb){
      const fileType=/jpeg|png|jpg/;
      const mimeType=fileType.test(file.mimetype);
      if (mimeType){
          cb(null,true)
      }else{cb(null,false)}
  }
  
});


router.post("/", upload.single("file"), (req, res) => {
    try {
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      console.error(error);
    }
  });

module.exports = router;