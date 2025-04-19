import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import ShoppingCart from "./components/ShoppingCart";
import Checkout from "./components/Checkout";
import Payment from "./components/Payment";
import SampleProducts from "./data/SampleProducts";


function App() {
  const [products] = useState(SampleProducts);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [appView, setAppView] = useState("shop");
  const [checkoutData, setCheckoutData] = useState(null);
  const [orderData, setOrderData] = useState(null);

  const categories = ["All", ...new Set(products.map(product => product.category))];

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(product => product.category === activeCategory);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    setIsCartOpen(true);
    setTimeout(() => setIsCartOpen(false), 3000);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(cart.map(item => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => {
      const itemPrice = item.discount ? 
        item.price - (item.price * item.discount / 100) : 
        item.price;
      return total + (itemPrice * item.quantity);
    }, 0);
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setAppView("checkout");
  };

  const handleBackToShop = () => {
    setAppView("shop");
  };

  const handleProceedToPayment = (checkoutInfo) => {
    setCheckoutData({
      ...checkoutInfo,
      subtotal: calculateSubtotal(),
      discount: 0,
      tax: (calculateSubtotal() * 0.1).toFixed(2)
    });
    setAppView("payment");
  };

  const handlePaymentComplete = (orderInfo) => {
    setOrderData(orderInfo);
    setAppView("orderComplete");
    setCart([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header cartCount={cartItemCount} onCartClick={toggleCart} />

      <main className="flex-grow container mx-auto px-4 py-8">
        {appView === "shop" && (
          <>
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-8 mb-8">
              <div className="max-w-2xl">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Special Summer Sale</h1>
                <p className="text-blue-100 mb-6">Get up to 40% off on selected items. Limited time offer!</p>
                <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                  Shop Now
                </button>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Browse Categories</h2>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeCategory === category 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {activeCategory === "All" ? "Featured Products" : activeCategory}
              </h2>
              <div className="text-sm text-gray-500">
                Showing {filteredProducts.length} products
              </div>
            </div>

            <ProductList products={filteredProducts} onAddToCart={addToCart} />
          </>
        )}

        {appView === "checkout" && (
          <Checkout 
            cartItems={cart} 
            subtotal={calculateSubtotal()} 
            onBack={handleBackToShop}
            onProceed={handleProceedToPayment}
          />
        )}

        {appView === "payment" && (
          <Payment 
            checkoutData={checkoutData}
            cartItems={cart}
            onBack={() => setAppView("checkout")}
            onComplete={handlePaymentComplete}
          />
        )}

        {appView === "orderComplete" && (
          <div className="max-w-2xl mx-auto text-center py-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You For Your Order!</h2>
                <p className="text-gray-600">Your order has been received and is being processed.</p>
              </div>

              <div className="mb-6 text-left border-t border-b border-gray-200 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Order Number</p>
                    <p className="font-medium">{orderData?.orderNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Date</p>
                    <p className="font-medium">
                      {orderData?.date && new Date(orderData.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                    <p className="font-medium">${orderData?.totalAmount.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Payment Method</p>
                    <p className="font-medium capitalize">
                      {orderData?.paymentInfo.method.replace('-', ' ')}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleBackToShop}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}

        {appView === "shop" && (
          <ShoppingCart 
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cartItems={cart}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeFromCart}
            onCheckout={handleCheckoutClick}
            subtotal={calculateSubtotal()}
          />
        )}

        {appView === "shop" && (
          <button
            className="fixed bottom-4 right-4 bg-blue-600 text-white rounded-full p-3 shadow-lg md:hidden"
            onClick={toggleCart}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;