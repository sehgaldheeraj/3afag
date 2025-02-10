const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const Todo = require("./models/todo.model");
const app = express();

app.set("view engine", "ejs"); //setting our view engine
app.use(express.urlencoded({ extended: true })); // middleware that converts urlencoded data to js object
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/addTodo", (req, res) => res.render("addTodo"));

app.post("/todos", async (req, res) => {
  const { name, type, status } = req.body;
  //add new Todo to our DB
  try {
    const todos = await Todo.addTodo(name, type, status);
    return res
      .status(201)
      .json({ message: "Todo added successfully", todos: todos }); //OK, created
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  //Todo.addTodo(title, type, status);
  //send response to the client
});

app.listen(3000, () => {
  console.log("Learing Restful Create at port 3000");
});
