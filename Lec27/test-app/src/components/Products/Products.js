import React, { useEffect } from "react";
const URI = "http://localhost:4000/v1/products";
const Products = () => {
  let products = [];
  async function fetchProducts() {
    try {
      const response = await fetch(URI);
      console.log(response);
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      {products.map((product) => {
        return (
          <div>
            <h3>{product.name}</h3>
            <p>{product.desc}</p>
            <p>{product.category}</p>
            <p>{product.price}</p>
            <p>{product.quantity}</p>
            <a href="/v1/products/{product.id}/edit">Update Product</a>
            <form
              method="POST"
              action="/v1/products/{product.id}?_method=DELETE"
            >
              <button type="submit">Delete Product</button>
            </form>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
