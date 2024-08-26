require ("dotenv").config();

const studRoutes=require("./routes/students/student.js");
const db=require("./db/index");

const express=require("express");
const app=new express();

app.use(express.json());


const port=process.env.PORT || 8045;

app.use("/students",studRoutes);

db();

app.listen(port,()=>{
    console.log(`Express listening at http://localhost:${port}`);
});