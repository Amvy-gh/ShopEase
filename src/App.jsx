import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import ShoppingCart from "./components/ShoppingCart";
import Checkout from "./components/Checkout";
import Payment from "./components/Payment";
import OrderComplete from "./components/OrderComplete";
import SpecialSaleBanner from "./components/SpecialSaleBanner";
import CategoryFilter from "./components/CategoryFilter";
import UserProfile from "./components/UserProfile"; // Import the new UserProfile component
import SampleProducts from "./data/SampleProducts";

function App() {
  const [products] = useState(SampleProducts);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false); // State for profile drawer
  const [activeCategory, setActiveCategory] = useState("All");
  const [appView, setAppView] = useState("shop");
  const [checkoutData, setCheckoutData] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  // Basic user data state - in a real app, this would come from authentication
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, USA",
    isLoggedIn: true, // Track login state
    orders: [
      { id: 'ORD-001', date: '2025-04-15', status: 'Delivered', total: 125.99 },
      { id: 'ORD-002', date: '2025-03-22', status: 'Processing', total: 79.50 },
    ]
  });

  const categories = ["All", ...new Set(products.map(product => product.category))];

  // Filter products based on both category and search query
  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = searchQuery === "" || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

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
    // Close profile if opening cart
    if (!isCartOpen) setIsProfileOpen(false);
  };

  // Toggle profile panel
  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    // Close cart if opening profile
    if (!isProfileOpen) setIsCartOpen(false);
  };

  // Handle user logout
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
    // In a real app, you would also clear any auth tokens/cookies here
  };

  // Handle user data updates
  const updateUserData = (newData) => {
    setUserData({
      ...userData,
      ...newData
    });
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setAppView("checkout");
  };

  const handleBackToShop = () => {
    setAppView("shop");
    // Reset search when going back to shop
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
    // Add the new order to user's order history if logged in
    if (userData.isLoggedIn) {
      const newOrder = {
        id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toISOString().split('T')[0],
        status: 'Processing',
        total: calculateSubtotal() + parseFloat((calculateSubtotal() * 0.1).toFixed(2))
      };
      
      setUserData({
        ...userData,
        orders: [newOrder, ...userData.orders]
      });
    }
    
    setOrderData(orderInfo);
    setAppView("orderComplete");
    setCart([]);
  };

  // Handle search input changes
  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header 
        cartCount={cartItemCount} 
        onCartClick={toggleCart}
        onProfileClick={toggleProfile} 
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
            onClose={() => setIsProfileOpen(false)}
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