import React from 'react';

const SpecialSaleBanner = () => (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-8 mb-8">
      <div className="max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Special Summer Sale</h1>
        <p className="text-blue-100 mb-6">Get up to 40% off on selected items. Limited time offer!</p>
        <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
          Shop Now
        </button>
      </div>
    </div>
  );
  
export default SpecialSaleBanner;