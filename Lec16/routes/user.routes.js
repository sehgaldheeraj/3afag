const router = require("express").Router();
const User = require("../models/user.model");
/**
 * const express = require("express");
 * const router = express.Router();
 */
//POST : localhost:3000/v1/users -> Create a new user
router.post("/", async (req, res) => {
  const { fullname, email, phone, password, role } = req.body;
  try {
    await User.create({ fullname, email, phone, password, role });
    res.status(201).send({ message: "User Registered Successfully" });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Internal Server Error", err: err.message });
  }
});
//POST /v1/users/login
router.post("/login", async (req, res) => {
  const { userEmail, userPassword } = req.body;
  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res
        .status(404)
        .send({ message: "User not found, kindly register" });
    }
    if (user.password !== userPassword) {
      return res.status(401).send({ message: "Invalid password" });
    }
    
  } catch (err) {
    res
      .status(500)
      .send({ message: "Internal Server Error", err: err.message });
  }
});

module.exports = router;
