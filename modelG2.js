const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const driveTest = new Schema({
  first_name: String,
  last_name: String,
  license_num: Number,
  age: Number,
  dob: Date,
});

const g2_schema = mongoose.model("g2_schema", driveTest);
module.exports = g2_schema;
