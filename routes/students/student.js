const express=require("express");
const  router =express.Router();
const mongoose = require('mongoose');
const Student=require("../../db/schema/studSchema.js")
const Department = require('../../db/schema/deptSchema.js'); 
//create
router.post('/', async (req, res) => {
  try {
    const { name, registrationNum, department } = req.body;

    if (!name || !registrationNum || !department) {
      return res.json({
        message: 'Name, registration number, and department are required.',
      });
    }

    if (!mongoose.Types.ObjectId.isValid(department)) {
      return res.json({
         message: 'Invalid department ID' });
    }

    const deptExists = await Department.findById(department);
    if (!deptExists) {
      return res.json({ 
        message: 'Department not found' });
    }

    const newStudent = new Student({ name, registrationNum, department });
    await newStudent.save();
    res.json({
         message: 'Data added successfully' });
  } catch (error) {
    console.error(error);
    res.json({ 
        message: 'Internal server error' });
  }
});
//update
router.put("/:id",async(req,res)=>{
        try{
            const studId =req.params.id;
            const updateStudData=req.body;
            await Student.findByIdAndUpdate(studId,updateStudData);
            res.json({
                message:"Data Updated Successfully",
            })

        }catch(error){
            console.log(error);
        res.json({
            message:"Internal server error",
        });     }
    });
//delete
    router.delete("/:id",async(req,res)=>{
        try{
            const studId=req.params.id;
            const deletestudData=req.body;
            await Student.findByIdAndDelete(studId,deletestudData);
            res.json({
                message:"Data Deleted successfully",
            })
        }catch(error){
            console.log(error);
            res.json({
                message:"internal server error",
            });
        }
    });

//request
    router.get("/department/:departmentId", async (req, res) => {
        try {
            const departmentId = req.params.departmentId;
    
            if (!isValidObjectId(departmentId)) {
                res.json({ message: 'Invalid department ID.' });
            }
    
            const students = await Student.find({ department: departmentId }).populate('department');
            res.json(students);
        } catch (error) {
            console.error(error);
            res.json({ message: 'Internal Server Error' });
        }
    });
    router.get("/", async (req, res) => {
        try {
            const queryParams = req.query;
            const filters = {};
    
            if (queryParams.name) {
                filters.name = {
                    $regex: `^${queryParams.name}`,
                    $options: "i",
                };
            }
    
            if (queryParams.registrationNum) {
                filters.registrationNum = {
                    $regex: `^${queryParams.registrationNum}`,
                    $options: "i",
                };
            }
    
            const students = await Student.find(filters).populate('department');
            res.json(students);
        } catch (error) {
            console.error(error);
            res.json({ message: 'Internal Server Error' });
        }
    });   
module.exports=router;