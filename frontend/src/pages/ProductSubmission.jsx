import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const ProductSubmission = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const onSubmit = async (data) => {
    setSubmissionStatus("submitting");
    try {
      const response = await axios.post(
        "https://e-comm-5tzg-git-main-jyotsana-joshis-projects.vercel.app/api/products",
        data
      );
      console.log("Product submitted:", response.data);
      reset(); // Clears the form
      setSubmissionStatus("success");
      window.dispatchEvent(new Event("productAdded"));
    } catch (error) {
      console.error("Error submitting product:", error);
      setSubmissionStatus("error");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Submit New Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            {...register("name", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            {...register("price", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            rows="3"
            {...register("description")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            {...register("imageUrl")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {isSubmitting ? "Submitting..." : "Submit Product"}
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
