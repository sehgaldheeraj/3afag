const router = require("express").Router();
const bcrypt = require("bcrypt");
const passport = require("../authentication/passport");
const User = require("../models/user.model");
/**
 * const express = require("express");
 * const router = express.Router();
 */
//POST : localhost:3000/v1/users -> Create a new user
router.post("/", async (req, res) => {
  const { username, email, phone, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10); //10 salt rounds
    await User.create({
      username,
      email,
      phone,
      password: hashedPassword,
      role,
    });
    res.status(201).send({ message: "User Registered Successfully" });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Internal Server Error", err: err.message });
  }
});
//POST /v1/users/login
router.post("/login", async (req, res) => {
  // const { userEmail, userPassword } = req.body;
  // console.log(userEmail);
  // try {
  //   //await passport.authenticate("local");
  //   //res.cookie("user", user);
  //   req.session.user = user; //session stored in server or sessionID got mapped with user details
  //   res.status(200).send({ msg: "Login Successfull" });
  // } catch (err) {
  //   res
  //     .status(500)
  //     .send({ message: "Internal Server Error", err: err.message });
  // }
  passport.authenticate("local");
});

function isAuthenticated(req, res, next) {
  if (!req.session.user) {
    //req.isAuthenticated()
    return res.status(403).send({ msg: "Unauthorized" });
  }
  next();
}

router.get("/profile", isAuthenticated, (req, res) => {
  res.status(200).send({ msg: `Welcome ${req.headers.user.fullname}` }); //${req.headers.user.fullname}!
});

module.exports = router;
