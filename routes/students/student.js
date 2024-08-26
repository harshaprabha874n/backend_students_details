const express=require("express");
const  Router =express.Router();

const Student=require("../../db/schema/index.js")
Router.get("/",(req,res)=>{
    res.send("students Database");
});
module.exports=Router;