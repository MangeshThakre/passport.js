const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  userName: { type: String, require: true },
  hash: { type: String, require: true },
  salt: { type: String, require: true },
});
const userModel = mongoose.model("userSchema", userSchema);

module.exports = userModel;
