const router = require("express").Router();
const userRoutes = require("./user.routes");
//Whenever user requests on /users
router.use("/users", userRoutes);
// router.use("/products", productRoutes);

module.exports = router;