import React, { useState } from 'react';

function Payment({ checkoutData, cartItems, onBack, onComplete }) {
  const [activeTab, setActiveTab] = useState('credit-card');
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    bankName: '',
    accountNumber: '',
    accountHolder: '',
    vaNumber: '',
    ewalletType: 'gopay',
    ewalletNumber: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    let formattedValue = value;
    
    // Format card number with spaces every 4 digits
    if (name === 'cardNumber') {
      formattedValue = value
        .replace(/\s/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim();
    }
    
    // Format expiry date as MM/YY
    if (name === 'expiryDate') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/^(\d{2})(\d)/, '$1/$2')
        .substring(0, 5);
    }
    
    setPaymentData({
      ...paymentData,
      [name]: formattedValue
    });
    
    // Clear error for this field when typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validatePaymentForm = () => {
    const newErrors = {};
    
    // Validate based on active tab
    if (activeTab === 'credit-card') {
      if (!paymentData.cardNumber.trim() || paymentData.cardNumber.replace(/\s/g, '').length < 16) {
        newErrors.cardNumber = 'Please enter a valid card number';
      }
      
      if (!paymentData.cardHolder.trim()) {
        newErrors.cardHolder = 'Please enter cardholder name';
      }
      
      if (!paymentData.expiryDate || !/^\d{2}\/\d{2}$/.test(paymentData.expiryDate)) {
        newErrors.expiryDate = 'Please enter valid expiry date (MM/YY)';
      } else {
        // Check if the expiry date is in the future
        const [month, year] = paymentData.expiryDate.split('/');
        const expiryDate = new Date('20' + year, month - 1);
        if (expiryDate < new Date()) {
          newErrors.expiryDate = 'Card has expired';
        }
      }
      
      if (!paymentData.cvv || !/^\d{3,4}$/.test(paymentData.cvv)) {
        newErrors.cvv = 'Enter valid CVV';
      }
    } else if (activeTab === 'bank-transfer') {
      if (!paymentData.bankName.trim()) {
        newErrors.bankName = 'Please select a bank';
      }
      
      if (!paymentData.accountNumber.trim() || !/^\d{10,16}$/.test(paymentData.accountNumber)) {
        newErrors.accountNumber = 'Please enter a valid account number';
      }
      
      if (!paymentData.accountHolder.trim()) {
        newErrors.accountHolder = 'Please enter account holder name';
      }
    } else if (activeTab === 'virtual-account') {
      if (!paymentData.vaNumber || !/^\d{10,16}$/.test(paymentData.vaNumber)) {
        newErrors.vaNumber = 'Please enter a valid virtual account number';
      }
    } else if (activeTab === 'e-wallet') {
      if (!paymentData.ewalletNumber || !/^\d{10,13}$/.test(paymentData.ewalletNumber)) {
        newErrors.ewalletNumber = 'Please enter a valid phone number';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async () => {
    if (!validatePaymentForm()) {
      return;
    }
    
    setIsProcessing(true);
    setLoading(true);
    
    // Simulate payment processing with a timeout
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
      
      const paymentInfo = {
        method: activeTab,
        ...paymentData,
        timestamp: new Date().toISOString()
      };
      
      onComplete({
        orderNumber,
        paymentInfo,
        checkoutData,
        items: cartItems,
        totalAmount: checkoutData.totalCost,
        date: new Date().toISOString()
      });
    } catch (error) {
      console.error('Payment processing error:', error);
      setErrors({
        general: 'There was an error processing your payment. Please try again.'
      });
    } finally {
      setLoading(false);
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        <button 
          onClick={onBack}
          className="mr-4 text-blue-600 hover:text-blue-800"
          disabled={isProcessing}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-2xl font-semibold">Payment</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment Methods */}
        <div className="lg:col-span-2">
          {/* Payment Tabs */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('credit-card')}
                  className={`py-4 px-6 font-medium text-sm border-b-2 ${
                    activeTab === 'credit-card' 
                      ? 'border-blue-500 text-blue-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  disabled={isProcessing}
                >
                  Credit Card
                </button>
                <button
                  onClick={() => setActiveTab('bank-transfer')}
                  className={`py-4 px-6 font-medium text-sm border-b-2 ${
                    activeTab === 'bank-transfer' 
                      ? 'border-blue-500 text-blue-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  disabled={isProcessing}
                >
                  Bank Transfer
                </button>
                <button
                  onClick={() => setActiveTab('virtual-account')}
                  className={`py-4 px-6 font-medium text-sm border-b-2 ${
                    activeTab === 'virtual-account' 
                      ? 'border-blue-500 text-blue-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  disabled={isProcessing}
                >
                  Virtual Account
                </button>
                <button
                  onClick={() => setActiveTab('e-wallet')}
                  className={`py-4 px-6 font-medium text-sm border-b-2 ${
                    activeTab === 'e-wallet' 
                      ? 'border-blue-500 text-blue-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  disabled={isProcessing}
                >
                  E-Wallet
                </button>
              </nav>
            </div>
          </div>
          
          {/* Credit Card Form */}
          {activeTab === 'credit-card' && (
            <div className="bg-white p-6 rounded-lg">
              <div className="mb-4">
                <div className="flex justify-end mb-2">
                  <div className="flex space-x-2">
                    <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" className="h-8" />
                    <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="Mastercard" className="h-8" />
                    <img src="https://img.icons8.com/color/48/000000/amex.png" alt="American Express" className="h-8" />
                  </div>
                </div>
                
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number*</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={paymentData.cardNumber}
                  onChange={handleInputChange}
                  maxLength="19"
                  placeholder="1234 5678 9012 3456"
                  className={`w-full p-2 border rounded ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
                  disabled={isProcessing}
                />
                {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
              </div>
              
              <div className="mb-4">
                <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name*</label>
                <input
                  type="text"
                  id="cardHolder"
                  name="cardHolder"
                  value={paymentData.cardHolder}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className={`w-full p-2 border rounded ${errors.cardHolder ? 'border-red-500' : 'border-gray-300'}`}
                  disabled={isProcessing}
                />
                {errors.cardHolder && <p className="text-red-500 text-xs mt-1">{errors.cardHolder}</p>}
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">Expiry Date*</label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    value={paymentData.expiryDate}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    maxLength="5"
                    className={`w-full p-2 border rounded ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'}`}
                    disabled={isProcessing}
                  />
                  {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
                </div>
                <div>
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV*</label>
                  <input
                    type="password"
                    id="cvv"
                    name="cvv"
                    value={paymentData.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    maxLength="4"
                    className={`w-full p-2 border rounded ${errors.cvv ? 'border-red-500' : 'border-gray-300'}`}
                    disabled={isProcessing}
                  />
                  {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                </div>
              </div>
            </div>
          )}
          
          {/* Bank Transfer Form */}
          {activeTab === 'bank-transfer' && (
            <div className="bg-white p-6 rounded-lg">
              <div className="mb-4">
                <label htmlFor="bankName" className="block text-sm font-medium text-gray-700 mb-1">Bank Name*</label>
                <select
                  id="bankName"
                  name="bankName"
                  value={paymentData.bankName}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded ${errors.bankName ? 'border-red-500' : 'border-gray-300'}`}
                  disabled={isProcessing}
                >
                  <option value="">Select bank</option>
                  <option value="bca">Bank Central Asia (BCA)</option>
                  <option value="mandiri">Bank Mandiri</option>
                  <option value="bni">Bank Negara Indonesia (BNI)</option>
                  <option value="bri">Bank Rakyat Indonesia (BRI)</option>
                </select>
                {errors.bankName && <p className="text-red-500 text-xs mt-1">{errors.bankName}</p>}
              </div>
              
              <div className="mb-4">
                <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-1">Account Number*</label>
                <input
                  type="text"
                  id="accountNumber"
                  name="accountNumber"
                  value={paymentData.accountNumber}
                  onChange={handleInputChange}
                  placeholder="10 to 16 digits"
                  className={`w-full p-2 border rounded ${errors.accountNumber ? 'border-red-500' : 'border-gray-300'}`}
                  disabled={isProcessing}
                />
                {errors.accountNumber && <p className="text-red-500 text-xs mt-1">{errors.accountNumber}</p>}
              </div>
              
              <div className="mb-4">
                <label htmlFor="accountHolder" className="block text-sm font-medium text-gray-700 mb-1">Account Holder Name*</label>
                <input
                  type="text"
                  id="accountHolder"
                  name="accountHolder"
                  value={paymentData.accountHolder}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className={`w-full p-2 border rounded ${errors.accountHolder ? 'border-red-500' : 'border-gray-300'}`}
                  disabled={isProcessing}
                />
                {errors.accountHolder && <p className="text-red-500 text-xs mt-1">{errors.accountHolder}</p>}
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg mb-4">
                <p className="text-sm text-gray-600">
                  Please transfer the exact amount to the following account:
                </p>
                <div className="mt-2">
                  <p className="font-medium">Account Number: 1234-5678-9012-3456</p>
                  <p className="font-medium">Account Name: E-Commerce Store</p>
                  <p className="text-sm text-gray-500 mt-2">Include your order number as payment reference</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Virtual Account Form */}
          {activeTab === 'virtual-account' && (
            <div className="bg-white p-6 rounded-lg">
              <div className="mb-4">
                <div className="flex justify-center space-x-4 mb-6">
                  <div className="border rounded p-3 w-20 h-20 flex items-center justify-center">
                    <img src="https://dashboard.laznasdewandakwah.or.id/storage/thumbnails/2022/3/petunjuk-pembayaran-via-bca-virtual-account_jpg" alt="BCA" className="h-10" />
                  </div>
                  <div className="border rounded p-3 w-20 h-20 flex items-center justify-center">
                    <img src="https://www.bankmandiri.co.id/documents/20143/43069492/use+Case+3.png/4a27b750-164b-37ed-9829-63dbac0cbd7c?t=1611053514457" alt="Mandiri" className="h-10" />
                  </div>
                  <div className="border rounded p-3 w-20 h-20 flex items-center justify-center">
                    <img src="https://logowik.com/content/uploads/images/bni-bank-negara-indonesia8078.logowik.com.webp" alt="BNI" className="h-10" />
                  </div>
                  <div className="border rounded p-3 w-20 h-20 flex items-center justify-center">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMeqbx8--46kKmCET5yZnDT9BFqSByqVCYQw&s" alt="BRI" className="h-10" />
                  </div>
                </div>
                
                <label htmlFor="vaNumber" className="block text-sm font-medium text-gray-700 mb-1">Virtual Account Number*</label>
                <input
                  type="text"
                  id="vaNumber"
                  name="vaNumber"
                  value={paymentData.vaNumber}
                  onChange={handleInputChange}
                  placeholder="Virtual Account Number"
                  className={`w-full p-2 border rounded ${errors.vaNumber ? 'border-red-500' : 'border-gray-300'}`}
                  disabled={isProcessing}
                />
                {errors.vaNumber && <p className="text-red-500 text-xs mt-1">{errors.vaNumber}</p>}
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">
                  How to pay with Virtual Account:
                </p>
                <ol className="list-decimal pl-5 text-sm text-gray-600">
                  <li className="mb-1">Log in to your mobile banking app</li>
                  <li className="mb-1">Select Virtual Account / Transfer payment option</li>
                  <li className="mb-1">Enter the Virtual Account number displayed above</li>
                  <li className="mb-1">Confirm payment details and complete transaction</li>
                  <li>Your order will be processed immediately after payment</li>
                </ol>
              </div>
            </div>
          )}
          
          {/* E-Wallet Form */}
          {activeTab === 'e-wallet' && (
            <div className="bg-white p-6 rounded-lg">
              <div className="mb-4">
                <label htmlFor="ewalletType" className="block text-sm font-medium text-gray-700 mb-1">E-Wallet Provider*</label>
                <div className="grid grid-cols-4 gap-3 mb-4">
                  <div 
                    className={`border rounded-lg p-3 flex flex-col items-center justify-center cursor-pointer ${
                      paymentData.ewalletType === 'gopay' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                    onClick={() => setPaymentData({...paymentData, ewalletType: 'gopay'})}
                  >
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-2">
                      <span className="text-white font-bold">GP</span>
                    </div>
                    <span className="text-xs font-medium">GoPay</span>
                  </div>
                  
                  <div 
                    className={`border rounded-lg p-3 flex flex-col items-center justify-center cursor-pointer ${
                      paymentData.ewalletType === 'ovo' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                    onClick={() => setPaymentData({...paymentData, ewalletType: 'ovo'})}
                  >
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-2">
                      <span className="text-white font-bold">OVO</span>
                    </div>
                    <span className="text-xs font-medium">OVO</span>
                  </div>
                  
                  <div 
                    className={`border rounded-lg p-3 flex flex-col items-center justify-center cursor-pointer ${
                      paymentData.ewalletType === 'dana' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                    onClick={() => setPaymentData({...paymentData, ewalletType: 'dana'})}
                  >
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-2">
                      <span className="text-white font-bold">DN</span>
                    </div>
                    <span className="text-xs font-medium">DANA</span>
                  </div>
                  
                  <div 
                    className={`border rounded-lg p-3 flex flex-col items-center justify-center cursor-pointer ${
                      paymentData.ewalletType === 'linkaja' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                    onClick={() => setPaymentData({...paymentData, ewalletType: 'linkaja'})}
                  >
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mb-2">
                      <span className="text-white font-bold">LA</span>
                    </div>
                    <span className="text-xs font-medium">LinkAja</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="ewalletNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
                <input
                  type="text"
                  id="ewalletNumber"
                  name="ewalletNumber"
                  value={paymentData.ewalletNumber}
                  onChange={handleInputChange}
                  placeholder="Phone number linked to your e-wallet"
                  className={`w-full p-2 border rounded ${errors.ewalletNumber ? 'border-red-500' : 'border-gray-300'}`}
                  disabled={isProcessing}
                />
                {errors.ewalletNumber && <p className="text-red-500 text-xs mt-1">{errors.ewalletNumber}</p>}
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  You will receive a payment request on your e-wallet app. Please complete the payment within 15 minutes.
                </p>
              </div>
            </div>
          )}
          
          {errors.general && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{errors.general}</p>
            </div>
          )}
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            
            <div className="space-y-3 mb-4">
              {cartItems.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    {item.quantity} × {item.name}
                  </span>
                  <span className="text-sm font-medium">${item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-3 mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Subtotal</span>
                <span className="text-sm font-medium">${checkoutData.subtotal}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Shipping</span>
                <span className="text-sm font-medium">${(checkoutData.shipping || 0).toFixed(2)}</span>
              </div>
              {checkoutData.discount > 0 && (
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Discount</span>
                  <span className="text-sm font-medium text-green-600">-${checkoutData.discount}</span>
                </div>
              )}
              {checkoutData.tax > 0 && (
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Tax</span>
                  <span className="text-sm font-medium">${checkoutData.tax}</span>
                </div>
              )}
            </div>
            
            <div className="flex justify-between">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">${checkoutData.totalCost.toFixed(2)}</span>
            </div>
            
            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white 
                ${isProcessing ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} 
                transition duration-150 ease-in-out`}
            >
              {isProcessing ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : `Pay $${checkoutData.totalCost}`}
            </button>
            
            <p className="text-xs text-gray-500 text-center mt-4">
              By clicking "Pay", you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;