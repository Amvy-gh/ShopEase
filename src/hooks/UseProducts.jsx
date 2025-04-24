import { useState, useMemo } from "react";

/**
 * Custom hook for managing product filtering, categories and search
 * @param {Array} initialProducts - The initial product list
 * @returns {Object} Product state and filtering functions
 */
const UseProducts = (initialProducts) => {
  const [products] = useState(initialProducts);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Extract unique categories once
  const categories = useMemo(() => {
    return ["All", ...new Set(products.map(product => product.category))];
  }, [products]);

  // Filter products based on both category and search query
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = activeCategory === "All" || product.category === activeCategory;
      const matchesSearch = searchQuery === "" || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, searchQuery]);

  /**
   * Handle search query changes
   * @param {string} query - New search query
   */
  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  /**
   * Clear the search query
   */
  const clearSearch = () => {
    setSearchQuery("");
  };

  /**
   * Get product display title based on current filters
   * @returns {string} The title to display above product list
   */
  const getDisplayTitle = () => {
    if (activeCategory !== "All") {
      return activeCategory;
    }
    return searchQuery ? `Search: "${searchQuery}"` : "Featured Products";
  };

  return {
    products,
    filteredProducts,
    categories,
    activeCategory,
    setActiveCategory,
    searchQuery,
    handleSearchChange,
    clearSearch,
    getDisplayTitle,
    productCount: filteredProducts.length
  };
};

export default UseProducts;