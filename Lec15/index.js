const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

function m1(req, res, next) {
  const { name, isLoggedIn } = req.body;
  if (!isLoggedIn) {
    return res.send({ msg: "You are not logged IN" });
  }
  next();
}
//app.post(route: string, controller: cb fn)
//app.post(route, middleware1, m2, m3,..., controller: cb fn)
app.post("/", m1, (req, res) => {
  const { name, isLoggedIn } = req.body;
  res.send({ msg: `${name} is logged in` });
});

app.listen(PORT, () => {
  console.log("learning mi ddlewares @ 3000");
});
