import React from 'react';

const CategoryFilter = ({ categories, activeCategory, setActiveCategory }) => (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Browse Categories</h2>
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === category 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
  
export default CategoryFilter;