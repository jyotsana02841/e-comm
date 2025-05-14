// frontend/src/App.js
import React, { useState } from 'react';
import ProductSubmission from './components/ProductSubmission';
import MyProducts from './components/MyProducts';

const App = () => {
  const [activeTab, setActiveTab] = useState('submission');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Mini E-Commerce Platform</h1>
      <div className="bg-gray-100 rounded-md shadow-md p-4 mb-4">
        <nav className="flex space-x-4">
          <button
            className={`py-2 px-4 rounded-md ${activeTab === 'submission' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'}`}
            onClick={() => setActiveTab('submission')}
          >
            Product Submission
          </button>
          <button
            className={`py-2 px-4 rounded-md ${activeTab === 'products' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'}`}
            onClick={() => setActiveTab('products')}
          >
            My Products
          </button>
        </nav>
      </div>

      {activeTab === 'submission' && <ProductSubmission />}
      {activeTab === 'products' && <MyProducts />}
    </div>
  );
};

export default App;