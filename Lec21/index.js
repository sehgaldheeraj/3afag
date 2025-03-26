const express = require("express");
const session = require("express-session");
const memoryStore = require("memorystore")(session);

const app = express();
const mongoose = require("mongoose");
const routes = require("./routes/index");
const URI = "mongodb://localhost:27017/EComAfAg";
app.use(express.json());
app.use(
  session({
    secret: "pow####pow",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 86400000 / 24, httpOnly: true, secure: false },
    store: new memoryStore({
      checkPeriod: 86400000,
    }),
  })
);

const passport = require("./authentication/passport");

app.use(passport.initialize());
app.use(passport.session());
//app.use(passport.authenticate("session"));

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
