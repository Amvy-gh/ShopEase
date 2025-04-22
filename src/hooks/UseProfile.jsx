import { useState } from "react";
import UseUserData from "../data/UserData";

/**
 * Custom hook for managing user profile state and actions
 * @returns {Object} Profile state and functions
 */
const UseProfile = () => {
  const [userData, setUserData] = UseUserData();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  /**
   * Toggle profile visibility
   * @param {Function} closeCart Optional callback to close cart when profile opens
   */
  const toggleProfile = (closeCart) => {
    setIsProfileOpen(!isProfileOpen);
    if (!isProfileOpen && closeCart) closeCart();
  };

  /**
   * Handle user logout
   */
  const handleLogout = () => {
    setUserData({
      name: "Guest User",
      email: "",
      phone: "",
      address: "",
      isLoggedIn: false,
      orders: []
    });
    setIsProfileOpen(false);
  };

  /**
   * Update user data
   * @param {Object} newData Updated user data fields
   */
  const updateUserData = (newData) => {
    setUserData({
      ...userData,
      ...newData
    });
  };

  /**
   * Add a new order to user's order history
   * @param {number} subtotal Order subtotal
   * @param {number} tax Order tax amount
   */
  const addOrderToHistory = (subtotal, tax) => {
    if (userData.isLoggedIn) {
      const newOrder = {
        id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toISOString().split('T')[0],
        status: 'Processing',
        total: subtotal + parseFloat(tax)
      };
      
      setUserData({
        ...userData,
        orders: [newOrder, ...userData.orders]
      });
    }
  };

  return {
    userData,
    isProfileOpen,
    toggleProfile,
    handleLogout,
    updateUserData,
    closeProfile: () => setIsProfileOpen(false),
    addOrderToHistory
  };
};

export default UseProfile;