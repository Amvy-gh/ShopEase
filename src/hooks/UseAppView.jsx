import { useState } from "react";

/**
 * Custom hook for managing application view states and transitions
 * @returns {Object} View state and navigation functions
 */
const UseAppView = () => {
  // Constants for view types (membantu mencegah typo)
  const VIEW_SHOP = "shop";
  const VIEW_CHECKOUT = "checkout";
  const VIEW_PAYMENT = "payment";
  const VIEW_ORDER_COMPLETE = "orderComplete";

  // State management
  const [appView, setAppView] = useState(VIEW_SHOP);
  const [checkoutData, setCheckoutData] = useState(null);
  const [orderData, setOrderData] = useState(null);

  /**
   * Navigate back to the shop view
   */
  const goToShop = () => {
    setAppView(VIEW_SHOP);
  };

  /**
   * Navigate to the checkout view
   */
  const goToCheckout = () => {
    setAppView(VIEW_CHECKOUT);
  };

  /**
   * Navigate to the payment view with checkout data
   * @param {Object} checkoutInfo - Checkout information
   * @param {number} subtotal - Cart subtotal
   */
  const goToPayment = (checkoutInfo, subtotal) => {
    setCheckoutData({
      ...checkoutInfo,
      subtotal: subtotal,
      discount: 0,
      tax: (subtotal * 0.1).toFixed(2)
    });
    setAppView(VIEW_PAYMENT);
  };

  /**
   * Navigate to the order complete view with order data
   * @param {Object} orderInfo - Order information
   */
  const goToOrderComplete = (orderInfo) => {
    setOrderData(orderInfo);
    setAppView(VIEW_ORDER_COMPLETE);
  };

  /**
   * Check if current view is the shop view
   * @returns {boolean} True if current view is shop
   */
  const isShopView = () => appView === VIEW_SHOP;

  /**
   * Check if current view is the checkout view
   * @returns {boolean} True if current view is checkout
   */
  const isCheckoutView = () => appView === VIEW_CHECKOUT;

  /**
   * Check if current view is the payment view
   * @returns {boolean} True if current view is payment
   */
  const isPaymentView = () => appView === VIEW_PAYMENT;

  /**
   * Check if current view is the order complete view
   * @returns {boolean} True if current view is order complete
   */
  const isOrderCompleteView = () => appView === VIEW_ORDER_COMPLETE;

  return {
    appView,
    checkoutData,
    orderData,
    goToShop,
    goToCheckout,
    goToPayment,
    goToOrderComplete,
    isShopView,
    isCheckoutView,
    isPaymentView,
    isOrderCompleteView
  };
};

export default UseAppView;