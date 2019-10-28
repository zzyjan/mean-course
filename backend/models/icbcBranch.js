const mongoose = require("mongoose");

const icbcBranchSchema = mongoose.Schema({
  cityName: {type: String},
  stateName: {type: String},
  areaCode: {type: String, required: true}
})

module.exports = mongoose.model('IcbcBranch', icbcBranchSchema);
