const mongoose = require("mongoose");

const empSchema = mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  idNbr: {type: String},
  phoneNbr: {type: Number},
  accounts: {type: mongoose.Schema.Types.ObjectId, ref: "Account"},
  position: {ype: mongoose.Schema.Types.ObjectId, ref: "Account"}
})

const postSchema = mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  creator: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"}
});

module.exports = mongoose.model('Post', postSchema);
