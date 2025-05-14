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
  console.log("getAllProducts called"); // Add this
  try {
    const result = await db.query("SELECT * FROM products");
    console.log("Query result:", result); // Add this
    return result.rows;
  } catch (error) {
    console.error("Error fetching products:", error);
    console.log("Error object:", error); // Add this
    throw error;
  }
}

async function searchProducts(input) {
  try {
    const keywords = input
      .toLowerCase()
      .split(/\s+/)
      .filter((word) => word.length > 2); // skip common/short words

    if (keywords.length === 0) return [];

    const conditions = keywords
      .map(
        (_, index) =>
          `(LOWER(name) ILIKE $${index + 1} OR LOWER(description) ILIKE $${
            index + 1
          })`
      )
      .join(" OR ");

    const values = keywords.map((k) => `%${k}%`);

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
    const result = await db.query("DELETE FROM products WHERE id = $1", [id]);
    return result; // Return the result of the query
  } catch (error) {
    console.error("Error deleting product from database:", error);
    throw error;
  }
}

module.exports = { createProduct, getAllProducts, searchProducts };
