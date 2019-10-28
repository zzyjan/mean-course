const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({
  accountNbr: {type: Number, required: true},
  branchLoc: {type: String},
  bank: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "Bank"}
  //{type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"}
})

module.exports = mongoose.model('Account', accountSchema)
