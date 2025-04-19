const router = require("express").Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/user.model");
/**
 * const express = require("express");
 * const router = express.Router();
 */
router.get("/register", (req, res) => {
  res.render("register");
});
//POST : localhost:3000/v1/users -> Create a new user
router.post("/", async (req, res) => {
  const { username, email, phone, password, role } = req.body;
  try {
    const user = new User({ username, email, phone, role });

    await User.register(user, password);
    await User.save();
    return res.redirect("/v1/users/login");
    //res.status(201).send({ message: "User Registered Successfully" });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Internal Server Error", err: err.message });
  }
});
router.get("/login", (req, res) => {
  res.render("login");
});
//POST /v1/users/login
// router.post(
//   "/login",
//   // async (req, res, next) => {
//   //   const authenticate = User.authenticate();
//   //   try {
//   //     await authenticate("username", "password");
//   //     res.redirect("/v1/products");
//   //   } catch (err) {
//   //     console.log(err.message);
//   //     res.redirect("/v1/users/login");
//   //   }
//   // }
//   passport.authenticate("local", {
//     failureRedirect: "/v1/users/login",
//     failureFlash: true,
//   }),
//   function (req, res) {
//     res.redirect("/v1/products");
//   }
// );
// POST /v1/users/login
// router.post("/login", (req, res, next) => {
//   passport.authenticate("local", (err, user, info) => {
//     if (err) {
//       console.error("Authentication Error: ", err);
//       return res.status(500).send({ message: "Internal Server Error" });
//     }

//     if (!user) {
//       console.log("Login failed:", info); // info will contain details like 'Invalid username or password'
//       return res
//         .status(401)
//         .send({ message: "Login Failed", reason: info.message });
//     }

//     // If authentication is successful
//     req.logIn(user, (err) => {
//       if (err) {
//         console.error("Login error: ", err);
//         return res
//           .status(500)
//           .send({ message: "Error during session creation" });
//       }
//       return res.redirect("/v1/products"); // Redirect on successful login
//     });
//   })(req, res, next);
// });
router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/v1/users/login" }),
  function (req, res) {
    res.redirect("/v1/products/new");
  }
);

function isAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    //req.isAuthenticated()
    return res.status(403).send({ msg: "Unauthorized" });
  }
  next();
}

router.get("/profile", isAuthenticated, (req, res) => {
  res.status(200).send({ msg: `Welcome ${req.headers.user.username}` }); //${req.headers.user.fullname}!
});

module.exports = router;
