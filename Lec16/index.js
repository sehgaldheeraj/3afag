const express = require("express");
const app = express();
const mongoose = require("mongoose");
const routes = require("./routes/index");
const URI = "mongodb://localhost:27017/EComAfAg";
app.use(express.json());

app.use("/v1", routes);

async function connect() {
  try {
    await mongoose.connect(URI);
  } catch (err) {
    console.log(err.message);
  }
}

connect();

app.listen(3000, () => {
  console.log("Learning ecom @ 3000");
});
