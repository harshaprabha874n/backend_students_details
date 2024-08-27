const express = require("express");
const router = express.Router();
const Department = require("../../db/schema/deptSchema.js");
//create

router.post('/', async (req, res) => {
    try {
        const deptData = req.body;
        console.log(deptData);
        const newDept = new Department(deptData);
        await newDept.save();
        res.json({
            message: "Department added successfully",
        });
    } catch (error) {
        console.log(error);
        if (error.code === 11000) {
            res.json({
                message: "Department name must be unique",
            });
        } else {
            res.json({
                message: "Internal server error",
            });
        }
    }
});

//update
router.put("/:id", async (req, res) => {
    try {
        const deptId = req.params.id;
        const updateDeptData = req.body;
        await Department.findByIdAndUpdate(deptId, updateDeptData);
        res.json({
            message: "Department updated successfully",
        });
    } catch (error) {
        console.log(error);
        res.json({
            message: "Internal server error",
        });
    }
});
//delete

router.delete("/:id", async (req, res) => {
    try {
        const deptId = req.params.id;
        await Department.findByIdAndDelete(deptId);
        res.json({
            message: "Department deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.json({
            message: "Internal server error",
        });
    }
});
//list
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

        const departments = await Department.find(filters);
        res.json(departments);
    } catch (error) {
        console.error(error);
        res.json({ message: 'Internal Server Error' });
    }
});
module.exports = router;
