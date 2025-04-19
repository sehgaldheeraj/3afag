const router = require("express").Router();
const Product = require("../models/product.model");
/**
 * TASK1: GET '/v1/products/new'
 *      Get a form that will add new product to the collection
 */
function isSeller(req, res, next) {
  console.log(req.user, req.session);
  if (req.isAuthenticated()) {
    next();
  }
  res.redirect("/v1/users/login");
}
router.get("/new", isSeller, (req, res) => res.render("addProduct"));
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
    //res.render("products", { products: products });
    res.status(200).json({ products: products });
  } catch (err) {
    res.status(500).send({ msg: "Internal Server Error", err: err.message });
  }
});
/**
 * TASK4: GET '/products/:id'
 *      GET a particular product by its ID
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.render("product", { product });
  } catch (err) {
    res.status(500).send({ msg: "Internal Server Error", err: err.message });
  }
});
/**
 * TASK5: GET 'products/:id/edit'
 *      GET a form that updates product details
 */
router.get("/:id/edit", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.render("updateProduct", { product });
  } catch (err) {
    res.status(500).send({ msg: "Internal Server Error", err: err.message });
  }
});
/**
 * TASK6: PATCH '/products/:id'
 *      Handle Update by Id in DB
 */
router.patch("/:id", async (req, res) => {
  const { name, desc, price, quantity, category, image } = req.body;
  const { id } = req.params;
  try {
    await Product.findByIdAndUpdate(id, {
      name,
      desc,
      price,
      quantity,
      category,
      image,
    });
    res.redirect("/v1/products");
  } catch (err) {
    res.status(500).send({ msg: "Internal Server Error", err: err.message });
  }
});
/**
 * TASK7: DELETE '/products/:id'
 *      Handle Delete by Id in DB
 */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.redirect("/v1/products");
  } catch (err) {
    res.status(500).send({ msg: "Internal Server Error", err: err.message });
  }
});

module.exports = router;
