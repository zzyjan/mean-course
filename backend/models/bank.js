const mongoose = require("mongoose");

const bankSchema = mongoose.Schema({
  name: {required: true, type: String},
  description: {type: String},
  paySysBankCode: {type: String}
})

module.exports = mongoose.model('Bank', bankSchema);
