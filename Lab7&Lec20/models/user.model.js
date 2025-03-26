const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  phone: Number,
  password: String,
  role: String,
});
//hash passwords, verifyEmail

userSchema.methods.verifyPassword = async (password) => {
  const match = await bcrypt.compare(password, this.password);
  return match;
};
const User = mongoose.model("user", userSchema);

module.exports = User;


