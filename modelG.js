const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const driveTest = new Schema({
  num_license: Number,
});

module.exports = mongoose.model("g_schema", driveTest);
