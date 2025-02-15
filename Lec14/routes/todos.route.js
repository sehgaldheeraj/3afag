const express = require("express");
const router = express.Router();
const { addTodo, getAllTodos, updateTodoById } = require("../controllers/todos.controller");
router.get("/", getAllTodos);

router.get("/addTodo", (req, res) => {
  res.render("addTodo");
});

router.post("/todos", addTodo );

//Update views
router.get("/updateTodo/:id", (req, res) => {
  const { id } = req.params;
  res.render("updateTodo", { id });
});

//Update Operation
router.patch("/todos/:id", updateTodoById);

module.exports = router;
