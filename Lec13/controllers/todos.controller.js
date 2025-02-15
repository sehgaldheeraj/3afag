const Todo = require("../models/todo.model");

const addTodo = async (req, res) => {
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
};

const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.readTodos();
    return res.render("index", { todos });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateTodoById = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  console.log(status);
  try {
    await Todo.updateTodo(id, status);
    return res.status(200).json({ message: "status updated successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { addTodo, getAllTodos, updateTodoById };
