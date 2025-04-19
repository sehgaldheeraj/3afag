const express = require("express");
const session = require("express-session");
//const memoryStore = require("memorystore")(session);
const methodOverride = require("method-override");
const path = require("path");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const app = express();
const User = require("./models/user.model");
const mongoose = require("mongoose");
const routes = require("./routes/index");
const URI = "mongodb://localhost:27017/EComAfAg";
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(
  session({
    secret: "pow####pow",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 86400000 / 24, httpOnly: true, secure: false },
    // store: new memoryStore({
    //   checkPeriod: 86400000,
    // }),
  })
);
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(flash());

//app.use(passport.authenticate("session"));
//PATCH "localhost:3000/v1/products/:id/edit"
app.get("/new", (req, res) => res.render("addProduct"));
app.use("/v1", routes);

async function connect() {
  try {
    await mongoose.connect(URI);
  } catch (err) {
    console.log(err.message);
  }
}
connect();
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: err,
  });
});
app.listen(4000, () => {
  console.log("Learning ecom @ 4000");
});
module.exports = passport;
