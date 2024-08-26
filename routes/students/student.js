const express=require("express");
const  router =express.Router();

const student=require("../../db/schema/studSchema.js")
router.get("/",async(req,res)=>{
    const students=await student.find();
    res.json(students);
});
module.exports=Router;