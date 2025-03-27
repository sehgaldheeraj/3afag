const router = require("express").Router();
const Product = require("../models/product.model");
/**
 * TASK1: GET '/v1/products/new'
 *      Get a form that will add new product to the collection
 */
router.get("/new", (req, res) => res.render("addProduct"));
/**
 * TASK2: POST '/products'
 *      Save product details in collection
 */
router.post("/", async (req, res) => {
  const { name, desc, category, price, quantity } = req.body;
  try {
    await Product.create({ name, desc, category, price, quantity });
    res.redirect("/v1/products");
  } catch (err) {
    res.status(500).send({ msg: "Internal Server Error", err: err.message });
  }
});
/**
 * TASK3: GET '/products'
 *      GET all products or queried products
 */
router.get("/", async (req, res) => {
  const { query } = req.query;
  try {
    if (query) {
      const queriedProducts = await Product.find({ name: query });
      return res.render("products", { products: queriedProducts });
    }
    const products = await Product.find();
    res.render("products", { products: products });
  } catch (err) {
    res.status(500).send({ msg: "Internal Server Error", err: err.message });
  }
});
/**
 * TASK4: GET '/products/:id'
 *      GET a particular product by its ID
 * TASK5: GET 'products/:id/edit'
 *      GET a form that updates product details
 * TASK6: PATCH '/products/:id'
 *      Handle Update by Id in DB
 * TASK7: DELETE '/products/:id'
 *      Handle Delete by Id in DB
 */

module.exports = router;
