const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true }, //TASK: custom validator in mongoose for email
  phone: { type: Number, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "buyer" }, //TASK: custom type enum: [buyer, seller, admin]
});
//hash passwords, verifyEmail

userSchema.methods.verifyPassword = async (password) => {
  const match = await bcrypt.compare(password, this.password);
  return match;
};
const User = mongoose.model("user", userSchema);

module.exports = User;
