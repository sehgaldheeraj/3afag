const fs = require("fs/promises");
const path = require("path");
const todosFile = path.join(__dirname, "todos.json");

class Todo {
  static addTodo = (title, type, status) => {
    return new Promise(async (resolve, reject) => {
      try {
        //read existing data
        const data = await fs.readFile(todosFile);
        const todos = JSON.parse(data);
        //add new data to that existing data
        const newTodo = {
          id: todos.length + 1,
          title: title,
          type: type,
          status: status,
        };
        todos.push(newTodo);
        //write that whole data
        await fs.writeFile(todosFile, JSON.stringify(todos));
        resolve(todos);
      } catch (err) {
        reject(err);
      }
    });
  };
  static getTodos = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await fs.readFile(todosFile);
        const todos = JSON.parse(data);
        resolve(todos);
      } catch (err) {
        reject(err);
      }
    });
  };
  
}
module.exports = Todo;
