import React from "react";
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

// Custom hooks
import UseCart from "./hooks/UseCart";
import UseProfile from "./hooks/UseProfile";
import UseProducts from "./hooks/UseProducts";
import UseAppView from "./hooks/UseAppView";
import UseCartModal from "./hooks/UseCartModal";
import UseCheckout from "./hooks/UseCheckOut";

function App() {
  // Profile management
  const {
    userData,
    isProfileOpen,
    toggleProfile,
    handleLogout,
    updateUserData,
    closeProfile,
    addOrderToHistory
  } = UseProfile();
  
  // Cart management
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    calculateSubtotal,
    cartItemCount,
    setCart
  } = UseCart();
  
  // App view management
  const {
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
  } = UseAppView();
  
  // Products and filtering
  const {
    filteredProducts,
    categories,
    activeCategory,
    setActiveCategory,
    searchQuery,
    handleSearchChange,
    clearSearch,
    getDisplayTitle,
    productCount
  } = UseProducts(SampleProducts);
  
  // Cart modal management
  const {
    isCartOpen,
    toggleCart,
    closeCart
  } = UseCartModal(closeProfile);
  
  // Checkout flow management - tanpa circular dependency
  const {
    handleProceedToPayment,
    handlePaymentComplete
  } = UseCheckout();

  // Handler untuk checkout dari keranjang
  const handleCheckoutClick = () => {
    closeCart();
    goToCheckout();
  };

  // Handler untuk kembali ke toko
  const handleBackToShop = () => {
    goToShop();
    clearSearch();
  };

  // Modified handler untuk proses ke pembayaran
  const handleProceedToPaymentWithNav = (checkoutInfo, subtotal) => {
    handleProceedToPayment(checkoutInfo, subtotal, goToPayment);
  };

  // Modified handler untuk menyelesaikan pembayaran
  const handlePaymentCompleteWithNav = (orderInfo, subtotal) => {
    handlePaymentComplete(
      orderInfo, 
      subtotal, 
      goToOrderComplete, 
      () => setCart([]), 
      addOrderToHistory
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header 
        cartCount={cartItemCount} 
        onCartClick={toggleCart}
        onProfileClick={() => toggleProfile(closeCart)} 
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        isLoggedIn={userData.isLoggedIn}
        userName={userData.name}
      />

      <main className="flex-grow container mx-auto px-4 py-8">
        {isShopView() && (
          <>
            <SpecialSaleBanner />
            
            <CategoryFilter 
              categories={categories} 
              activeCategory={activeCategory} 
              setActiveCategory={setActiveCategory} 
            />
            
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {getDisplayTitle()}
              </h2>
              <div className="text-sm text-gray-500">
                Showing {productCount} products
              </div>
            </div>
            
            {productCount > 0 ? (
              <ProductList products={filteredProducts} onAddToCart={addToCart} />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your search.</p>
                <button 
                  onClick={clearSearch}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Clear Search
                </button>
              </div>
            )}
          </>
        )}

        {isCheckoutView() && (
          <Checkout 
            cartItems={cart} 
            subtotal={calculateSubtotal()} 
            onBack={handleBackToShop}
            onProceed={(checkoutInfo) => handleProceedToPaymentWithNav(checkoutInfo, calculateSubtotal())}
            userData={userData}
          />
        )}

        {isPaymentView() && (
          <Payment 
            checkoutData={checkoutData}
            cartItems={cart}
            onBack={goToCheckout}
            onComplete={(orderInfo) => handlePaymentCompleteWithNav(orderInfo, calculateSubtotal())}
          />
        )}

        {isOrderCompleteView() && (
          <OrderComplete orderData={orderData} onBack={handleBackToShop} />
        )}

        {isShopView() && (
          <ShoppingCart 
            isOpen={isCartOpen}
            onClose={closeCart}
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

        {isShopView() && (
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