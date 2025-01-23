const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/register", (req, res) => {
  console.log(users);
  res.render("register");
});
const users = [];
app.post("/users", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(404).send({ message: "Please enter all fields" });
  }
  users.push(req.body); ///
  console.log(users);
  res.status(201).send({ message: "Account created Successfully" });
});
// app.get('/styles.css', (req, res)=>{
//     res.sendFile('public/styles.css', (err)=>{
//         if(err){
//             console.log(err.message);
//         }
//     })
// })

app.listen(3000, () => {
  console.log("Learing Restful Create at port 3000");
});
