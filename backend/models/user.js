const mongoose = require("mongoose");
const unique_validator = require("mongoose-unique-validator")

const userSchema = mongoose.Schema({
  email: {type: String, require: true, unique: true},
  password: {type: String, require: true}
});

userSchema.plugin(unique_validator);

module.exports = mongoose.model("User", userSchema);
