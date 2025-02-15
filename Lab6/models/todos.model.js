const mongoose = require("mongoose");

const todosSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: String,
  category: { type: String, default: "Others" },
  state: { type: String, default: "pending" },
  time: { type: Date, default: Date.now },
});

todosSchema.pre("save", function (next) {
  //check if desc.length > 500
  //if yes: trim desc
  //next()
});
todosSchema.post("save", function (next) {
  console.log("Todo saved successfully");
  next();
});

//acknowledge that update has occured
todosSchema.post("findByIdAndUpdate", function (next) {
  console.log("Todo updated successfully");
  next();
});

const Todo = mongoose.model("Todo", todosSchema);
// plural lowercased name: todos
//ex2: 'User' -> users

module.exports = Todo;
