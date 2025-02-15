const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const routes = require("./routes/index");


const app = express();

const dbName = "todosDB";
const URI = `mongodb://localhost:27017/${dbName}`;

app.set("view engine", "ejs"); //setting our view engine
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true })); // middleware that converts urlencoded data to js object
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.use("/v1", routes);

connection()
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err.message));

/**
 * Connects to the MongoDB database using the provided URI
 * @returns {Promise} resolved when the connection is established
 */
async function connection() {
  await mongoose.connect(URI);
}

app.listen(3000, () => {
  console.log("Learing Restful Create at port 3000");
});
