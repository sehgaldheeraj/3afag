const Todo = require("../models/todo.deprecated");

/**
 * Adds a Todo to your DB
 * @param {request object} req
 * @param {resposnt object} res
 * @returns Promise<any>
 */
const addTodo = async (req, res) => {
  const { name, desc, category, state } = req.body;
  //add new Todo to our DB
  try {
    //const todos = await Todo.addTodo(name, type, status);
    //add Todo to mongoDB using mongoose
    //method1: create a todo instance from Todo class and save it
    const todo = new Todo({ name, desc, category, state });
    await todo.save();

    //method2: directly create a new todo on Todo class
    //const todo = await Todo.create({ name, desc, category, state });
    return res
      .status(201)
      .json({ message: "Todo added successfully", newTodo: todo }); //OK, created
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  //Todo.addTodo(title, type, status);
  //send response to the client
};

const getAllTodos = async (req, res) => {
  try {
    //const todos = await Todo.readTodos();
    const todos = await Todo.find();
    return res.render("index", { todos });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Your Todo
 * getTodoById       -> Todo.findById(id) or Todo.findOne({id: id})
 * getTodoByName     -> Todo.findOne({name: name})
 */

const updateTodoById = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  console.log(status);
  try {
    //await Todo.updateTodo(id, status);
    await Todo.findByIdAndUpdate(id, { status: status });
    //await Todo.findOneAndUpdate({id, id}, {status: status});
    return res.status(200).json({ message: "status updated successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/**
 * Your Todo 2
 * updateTodoByName    -> findOneAndUpdate()
 */

module.exports = { addTodo, getAllTodos, updateTodoById };
