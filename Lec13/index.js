const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const routes = require("./routes/index");
const app = express();

app.set("view engine", "ejs"); //setting our view engine
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true })); // middleware that converts urlencoded data to js object
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.use("/v1", routes);

app.listen(3000, () => {
  console.log("Learing Restful Create at port 3000");
});
