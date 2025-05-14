import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-md shadow-md p-4">
      {product.image_url && (
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-32 object-cover mb-2 rounded-md"
        />
      )}
      <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
      <p className="text-gray-600 mb-1">Price: ${product.price}</p>
      <p className="text-gray-700">{product.description}</p>
    </div>
  );
};

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState(""); // Added state for the filter

  // const fetchProducts = async () => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const url = filter.trim()
  //       ? `http://localhost:5000/api/products/search?q=${encodeURIComponent(
  //           filter
  //         )}`
  //       : "http://localhost:5000/api/products";

  //     const response = await axios.get(url);
  //     setProducts(response.data);
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //     setError("Failed to fetch products.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = filter.trim()
        ? `http://localhost:5000/api/products/search?q=${encodeURIComponent(
            filter
          )}`
        : "http://localhost:5000/api/products";

      const response = await axios.get(url);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // Listen for product added event to refresh the list
    window.addEventListener("productAdded", fetchProducts);
    return () => {
      window.removeEventListener("productAdded", fetchProducts);
    };
  }, []);

  // const handleFilterChange = (e) => {
  //   setFilter(e.target.value);
  // };
  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);
  };

  useEffect(() => {
    fetchProducts();
  }, [filter]);

  const filteredProducts = products.filter((product) => {
    const searchTerm = filter.toLowerCase();
    return (
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">My Products</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter by name or description..."
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={filter}
          onChange={handleFilterChange}
        />
      </div>
      {loading && <p>Loading products...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {products.length === 0 && !loading && !error && (
        <p>No products submitted yet.</p>
      )}
    </div>
  );
};

export default MyProducts;
