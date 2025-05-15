import React, { useState } from "react";
import ProductSubmission from "./pages/ProductSubmission";
import MyProducts from "./pages/MyProducts";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  const [activeTab, setActiveTab] = useState("submission");

  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Mini E-Commerce Platform</h1>
        <div className="bg-gray-100 rounded-md shadow-md p-4 mb-4">
          <Navbar />
        </div>
        <Routes>
          <Route path="/" element={<ProductSubmission />} />
          <Route path="/products" element={<MyProducts />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
