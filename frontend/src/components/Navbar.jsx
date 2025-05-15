import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("submission");

  return (
    <div>
      <nav className="flex space-x-4">
            <Link
              to="/"
              className={`py-2 px-4 rounded-md ${
                activeTab === "submission"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400"
              }`}
              onClick={() => setActiveTab('submission')}
            >
              Product Submission
            </Link>
            <Link
              to="/products"
              className={`py-2 px-4 rounded-md ${
                activeTab === "products"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400"
              }`}
              onClick={() => setActiveTab('products')}
            >
              My Products
            </Link>
          </nav>
    </div>
  )
}

export default Navbar
