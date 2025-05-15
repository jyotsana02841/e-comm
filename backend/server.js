const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const productModel = require("./models/productModel");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.post("/api/products", async (req, res) => {
  try {
    const { name, price, description, imageUrl } = req.body;
    const newProduct = await productModel.createProduct(
      name,
      price,
      description,
      imageUrl
    );
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to create product" });
  }
});

app.get("/api/products", async (req, res) => {
  console.log("/api/products route called"); // Add this
  try {
    const products = await productModel.getAllProducts();
    console.log("Products fetched:", products); // Add this
    res.json(products);
  } catch (error) {
    console.error("Error in /api/products:", error);
    console.log("Error object:", error); // Add this
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

app.get("/api/products/search", async (req, res) => {
  const { q } = req.query;
  if (q) {
    try {
      const results = await productModel.searchProducts(q);
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: "Failed to search products" });
    }
  } else {
    const products = await productModel.getAllProducts();
    res.json(products);
  }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await productModel.deleteProduct(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
