export const AppViewController = ({
    setAppView,
    setCheckoutData,
    setOrderData
  }) => {
    const goToShop = () => setAppView("shop");
  
    const goToCheckout = () => setAppView("checkout");
  
    const goToPayment = (checkoutInfo, subtotal) => {
      setCheckoutData({
        ...checkoutInfo,
        subtotal,
        discount: 0,
        tax: (subtotal * 0.1).toFixed(2)
      });
      setAppView("payment");
    };
  
    const goToOrderComplete = (orderInfo) => {
      setOrderData(orderInfo);
      setAppView("orderComplete");
    };
  
    return {
      goToShop,
      goToCheckout,
      goToPayment,
      goToOrderComplete
    };
  };