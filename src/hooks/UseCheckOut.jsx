import { useState } from "react";

/**
 * Custom hook untuk mengelola proses checkout tanpa circular dependency
 */
const UseCheckout = () => {
  const [paymentData, setPaymentData] = useState(null);
  const [orderCompleteData, setOrderCompleteData] = useState(null);

  /**
   * Handle proceeding to payment with checkout information
   * @param {Object} checkoutInfo - User input checkout information
   * @param {number} subtotal - Cart subtotal
   * @param {Function} navigationCallback - Callback untuk navigasi ke halaman pembayaran
   */
  const handleProceedToPayment = (checkoutInfo, subtotal, navigationCallback) => {
    // Simpan data jika diperlukan
    setPaymentData({ ...checkoutInfo, subtotal });
    
    // Gunakan callback untuk navigasi
    if (navigationCallback) {
      navigationCallback(checkoutInfo, subtotal);
    }
  };

  /**
   * Handle payment completion and order creation
   * @param {Object} orderInfo - Order information from payment
   * @param {number} subtotal - Cart subtotal
   * @param {Function} navigationCallback - Callback untuk navigasi ke halaman order complete
   * @param {Function} clearCartCallback - Callback untuk mengosongkan keranjang
   * @param {Function} addOrderCallback - Callback untuk menambahkan pesanan ke riwayat
   */
  const handlePaymentComplete = (
    orderInfo, 
    subtotal, 
    navigationCallback, 
    clearCartCallback, 
    addOrderCallback
  ) => {
    const taxAmount = parseFloat((subtotal * 0.1).toFixed(2));
    
    // Simpan data order
    setOrderCompleteData(orderInfo);
    
    // Tambahkan order ke history jika ada callback
    if (addOrderCallback) {
      addOrderCallback(subtotal, taxAmount);
    }
    
    // Navigasi ke halaman order complete jika ada callback
    if (navigationCallback) {
      navigationCallback(orderInfo);
    }
    
    // Kosongkan keranjang jika ada callback
    if (clearCartCallback) {
      clearCartCallback();
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