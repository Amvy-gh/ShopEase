import { useState } from "react";

const UseCheckout = () => {
  const [paymentData, setPaymentData] = useState({
    shipping: 0,
    subtotal: 0,
    tax: 0,
    totalCost: 0,
    shippingMethod: ''
  });
  
  const [orderCompleteData, setOrderCompleteData] = useState(null);

  const calculateTotalCost = (subtotal, shippingCost, taxRate = 0.1) => {
    const tax = subtotal * taxRate;
    return {
      shipping: shippingCost,
      subtotal,
      tax: parseFloat(tax.toFixed(2)),
      totalCost: parseFloat((subtotal + shippingCost + tax).toFixed(2))
    };
  };

  const handleProceedToPayment = (checkoutInfo, subtotal, navigationCallback) => {
    // Validasi data
    const validatedSubtotal = Number(subtotal) || 0;
    const shippingCost = Number(checkoutInfo.shippingCost) || 0;
    
    // Hitung total
    const totalCost = validatedSubtotal + shippingCost + (validatedSubtotal * 0.1);
  
    const paymentPayload = {
      ...checkoutInfo,
      subtotal: validatedSubtotal,
      shipping: shippingCost,
      tax: validatedSubtotal * 0.1,
      totalCost: parseFloat(totalCost.toFixed(2))
    };
  
    setPaymentData(paymentPayload);
    navigationCallback?.(paymentPayload);
  };

  const handlePaymentComplete = (
    orderInfo, 
    callbacks = {}
  ) => {
    try {
      // Validasi final order
      if (!paymentData?.totalCost || !orderInfo?.paymentMethod) {
        throw new Error('Incomplete payment data');
      }

      const completeOrder = {
        ...paymentData,
        ...orderInfo,
        orderDate: new Date().toISOString()
      };

      // Update state
      setOrderCompleteData(completeOrder);
      
      // Eksekusi callback
      callbacks.addOrderCallback?.(completeOrder);
      callbacks.clearCartCallback?.();
      callbacks.navigationCallback?.(completeOrder);

      // Debugging log
      console.log('[Payment] Completed order:', completeOrder);

    } catch (error) {
      console.error('Payment completion error:', error);
      throw new Error(`Payment failed: ${error.message}`);
    }
  };

  return {
    paymentData,
    orderCompleteData,
    handleProceedToPayment,
    handlePaymentComplete
  };
};

export default UseCheckout;