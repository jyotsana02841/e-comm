// frontend/src/components/ProductSubmission.js
import React, { useState } from "react";
import axios from "axios";

const ProductSubmission = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus("submitting");
    try {
      const response = await axios.post("http://localhost:5000/api/products", {
        name,
        price,
        description,
        imageUrl,
      });
      console.log("Product submitted:", response.data);
      setName("");
      setPrice("");
      setDescription("");
      setImageUrl("");
      setSubmissionStatus("success");
      // Optionally trigger a refetch of products in the other tab
      window.dispatchEvent(new Event("productAdded"));
    } catch (error) {
      console.error("Error submitting product:", error);
      setSubmissionStatus("error");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Submit New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Product Name:
          </label>
          <input
            type="text"
            id="name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Price:
          </label>
          <input
            type="number"
            id="price"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Description:
          </label>
          <textarea
            id="description"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="imageUrl"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Image URL (Optional):
          </label>
          <input
            type="url"
            id="imageUrl"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={submissionStatus === "submitting"}
        >
          {submissionStatus === "submitting"
            ? "Submitting..."
            : "Submit Product"}
        </button>
        {submissionStatus === "success" && (
          <p className="text-green-500 mt-2">Product submitted successfully!</p>
        )}
        {submissionStatus === "error" && (
          <p className="text-red-500 mt-2">Failed to submit product.</p>
        )}
      </form>
    </div>
  );
};
export default ProductSubmission;
