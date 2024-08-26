const mongooese = require("mongoose");

const movieSchema = new mongooese.Schema({
  name: {
    type: String,
    required: true,
  },
  registrationNum: {
    type: String,
    required: true,
  },
  department:{
    type: Date,
    required: true,
  },
  phoneNum:{
    type: String,
    required: false,
  },
  dateOfBirth: {
    type: Number,
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
  },
});

const Movie = mongooese.model("Movie", movieSchema);

module.exports = Movie;