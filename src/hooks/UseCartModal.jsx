import { useState } from "react";

/**
 * Custom hook for managing cart modal visibility
 * @param {Function} closeProfile - Function to close profile when cart opens
 * @returns {Object} Cart modal state and functions
 */
const UseCartModal = (closeProfile) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  /**
   * Toggle cart visibility
   */
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    
    // Close profile if opening cart
    if (!isCartOpen && closeProfile) {
      closeProfile();
    }
  };

  /**
   * Close the cart
   */
  const closeCart = () => {
    setIsCartOpen(false);
  };

  return {
    isCartOpen,
    toggleCart,
    closeCart
  };
};

export default UseCartModal;