const db = require("../db");

async function createProduct(name, price, description, imageUrl) {
  try {
    const result = await db.query(
      "INSERT INTO products (name, price, description, image_url) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, price, description, imageUrl]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
}

async function getAllProducts() {
  console.log("getAllProducts called");
  try {
    const result = await db.query("SELECT * FROM products");
    console.log("Query result:", result);
    return result.rows;
  } catch (error) {
    console.error("Error fetching products:", error);
    console.log("Error object:", error);
    throw error;
  }
}

async function searchProducts(input) {
  try {
    const keywords = input
      .toLowerCase()
      .split(/\s+/)
      .filter((word) => word.length > 0);

    if (keywords.length === 0) return [];

    const conditions = keywords
      .map((_, index) => {
        return `(LOWER(name) ILIKE $${index + 1} OR LOWER(description) ILIKE $${
          index + 1
        })`;
      })
      .join(" AND ");

    const values = keywords.map((word) => `%${word}%`);

    const query = `SELECT * FROM products WHERE ${conditions}`;
    const result = await db.query(query, values);
    return result.rows;
  } catch (error) {
    console.error("Error in contextual search:", error);
    throw error;
  }
}

async function deleteProduct(id) {
  try {
    await db.query("DELETE FROM products WHERE id = $1", [id]);
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  searchProducts,
  deleteProduct,
};
