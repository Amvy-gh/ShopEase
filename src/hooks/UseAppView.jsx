import { useState } from "react";

/**
 * @returns {Object}
 */
const UseAppView = () => {
  const VIEW_SHOP = "shop";
  const VIEW_CHECKOUT = "checkout";
  const VIEW_PAYMENT = "payment";
  const VIEW_ORDER_COMPLETE = "orderComplete";

  // State management
  const [appView, setAppView] = useState(VIEW_SHOP);
  const [checkoutData, setCheckoutData] = useState(null);
  const [orderData, setOrderData] = useState(null);
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
    setAppView,
    setCheckoutData,
    setOrderData, 
    isShopView: () => appView === VIEW_SHOP,
    isCheckoutView: () => appView === VIEW_CHECKOUT,
    isPaymentView: () => appView === VIEW_PAYMENT,
    isOrderCompleteView: () => appView === VIEW_ORDER_COMPLETE
  };
};

export default UseAppView;