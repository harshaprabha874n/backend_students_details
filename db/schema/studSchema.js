const mongoose = require("mongoose");

const studSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  registrationNum: {
    type: String,
    required: true,
    unique:true,
  },
  department:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required:true,
  }
});

const Student= mongoose.model("Student", studSchema);

module.exports =Student;