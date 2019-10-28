const mongoose = require("mongoose");

const positionSchema = mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String}
})

module.exports = mongoose.model("Position", positionSchema)
