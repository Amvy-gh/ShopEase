/**
 * Handles the completion of a payment process
 * @param {Object} options
 * @param {Object} options.orderInfo - Order information
 * @param {number} options.subtotal - Total amount of the order
 * @param {Function} options.setCart - Function to reset the cart
 * @param {Function} options.addToHistory - Function to add order to history
 * @param {Function} options.navigate - Function to navigate to another view
 */
export function completePayment({ orderInfo, subtotal, setCart, addToHistory, navigate }) {
    // Optionally: log, validate, or enrich orderInfo here
  
    // Add order to user history
    addToHistory({
      ...orderInfo,
      subtotal,
      timestamp: new Date().toISOString()
    });
  
    // Clear cart
    setCart([]);
  
    // Navigate to order complete page
    navigate("orderComplete");
  }
  