import React, { useState } from "react";
import Header from "./components/pages/main/Header";
import Footer from "./components/pages/main/Footer";
import ProductList from "./components/utils/ProductList";
import ShoppingCart from "./components/pages/payment/ShoppingCart";
import Checkout from "./components/pages/payment/Checkout";
import Payment from "./components/pages/payment/Payment";
import OrderComplete from "./components/pages/payment/OrderComplete";
import SpecialSaleBanner from "./components/pages/main/SpecialSaleBanner";
import CategoryFilter from "./components/utils/CategoryFilter";
import UserProfile from "./components/pages/main/UserProfile";
import SampleProducts from "./data/SampleProducts";
import UseCart from "./hooks/UseCart";
import UseProfile from "./hooks/UseProfile";

function App() {
  const [products] = useState(SampleProducts);
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    calculateSubtotal,
    cartItemCount,
    setCart
  } = UseCart();
  
  const {
    userData,
    isProfileOpen,
    toggleProfile,
    handleLogout,
    updateUserData,
    closeProfile,
    addOrderToHistory
  } = UseProfile();
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [appView, setAppView] = useState("shop");
  const [checkoutData, setCheckoutData] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const categories = ["All", ...new Set(products.map(product => product.category))];

  // Filter products based on both category and search query
  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = searchQuery === "" || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    if (!isCartOpen) closeProfile();
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setAppView("checkout");
  };

  const handleBackToShop = () => {
    setAppView("shop");
    setSearchQuery("");
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
    const taxAmount = parseFloat((calculateSubtotal() * 0.1).toFixed(2));
    
    // Add order to history using the profile hook method
    addOrderToHistory(calculateSubtotal(), taxAmount);
    
    setOrderData(orderInfo);
    setAppView("orderComplete");
    setCart([]);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header 
        cartCount={cartItemCount} 
        onCartClick={toggleCart}
        onProfileClick={() => toggleProfile(() => setIsCartOpen(false))} 
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        isLoggedIn={userData.isLoggedIn}
        userName={userData.name}
      />

      <main className="flex-grow container mx-auto px-4 py-8">
        {appView === "shop" && (
          <>
            <SpecialSaleBanner />
            
            <CategoryFilter categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {activeCategory === "All" ? 
                  (searchQuery ? `Search: "${searchQuery}"` : "Featured Products") : 
                  activeCategory}
              </h2>
              <div className="text-sm text-gray-500">
                Showing {filteredProducts.length} products
              </div>
            </div>
            {filteredProducts.length > 0 ? (
              <ProductList products={filteredProducts} onAddToCart={addToCart} />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your search.</p>
                <button 
                  onClick={() => handleSearchChange("")}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Clear Search
                </button>
              </div>
            )}
          </>
        )}

        {appView === "checkout" && (
          <Checkout 
            cartItems={cart} 
            subtotal={calculateSubtotal()} 
            onBack={handleBackToShop}
            onProceed={handleProceedToPayment}
            userData={userData} // Pass user data for auto-filling
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
          <OrderComplete orderData={orderData} onBack={handleBackToShop} />
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

        {/* Profile Component */}
        {isProfileOpen && (
          <UserProfile 
            onClose={closeProfile}
            userData={userData}
            onLogout={handleLogout}
            onUpdateUserData={updateUserData}
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