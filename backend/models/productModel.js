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

// async function searchProducts(input) {
//   try {
//     const keywords = input
//       .toLowerCase()
//       .split(/\s+/)
//       .filter((word) => word.length > 2); // skip common/short words

//     if (keywords.length === 0) return [];

//     const conditions = keywords
//       .map(
//         (_, index) =>
//           `(LOWER(name) ILIKE $${index + 1} OR LOWER(description) ILIKE $${
//             index + 1
//           })`
//       )
//       .join(" OR ");

//     const values = keywords.map((k) => `%${k}%`);

//     const query = `SELECT * FROM products WHERE ${conditions}`;
//     const result = await db.query(query, values);
//     return result.rows;
//   } catch (error) {
//     console.error("Error in contextual search:", error);
//     throw error;
//   }
// }

// async function searchProducts(input) {
//   try {
//     // Convert input into distinct, meaningful lowercase keywords
//     const keywords = input
//       .toLowerCase()
//       .split(/\s+/)
//       .filter((word) => word.length > 1); // Allowing short words like "4k"

//     if (keywords.length === 0) return [];

//     // Build dynamic WHERE clause: keyword1 OR keyword2 OR ...
//     const conditions = keywords
//       .map(
//         (_, index) =>
//           `(LOWER(name) ILIKE $${index + 1} OR LOWER(description) ILIKE $${index + 1})`
//       )
//       .join(" OR ");

//     const values = keywords.map((word) => `%${word}%`);

//     const query = `SELECT * FROM products WHERE ${conditions}`;
//     const result = await db.query(query, values);
//     return result.rows;
//   } catch (error) {
//     console.error("Error in contextual search:", error);
//     throw error;
//   }
// }

async function searchProducts(input) {
  try {
    // Split the input into keywords and filter out empty words
    const keywords = input
      .toLowerCase()
      .split(/\s+/)
      .filter((word) => word.length > 0);

    if (keywords.length === 0) return [];

    // For each keyword, we'll check both the 'name' and 'description' fields
    const conditions = keywords
      .map((_, index) => {
        return `(LOWER(name) ILIKE $${index + 1} OR LOWER(description) ILIKE $${
          index + 1
        })`;
      })
      .join(" AND "); // Use AND instead of OR to match all keywords

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


