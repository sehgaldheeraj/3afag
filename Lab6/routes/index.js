const express = require("express");
const router = express.Router();
const todoRoutes = require("./todos.route");
router.use("/todos", todoRoutes);
// router.use("/users", userRoutes);
// router.use("/comments", commentsRoutes);

module.exports = router;
