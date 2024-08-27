require ("dotenv").config()
const express=require("express");

const studRoutes=require("./routes/students/student.js");
const deptRoutes=require("./routes/departments/department.js");
const db=require("./db/index");

const app=new express();

app.use(express.json());
db();
const port=process.env.PORT || 8045;
app.use("/students",studRoutes);
app.use("/departments",deptRoutes);
app.listen(port,()=>{
    console.log(`Express listening at http://localhost:${port}`);
});