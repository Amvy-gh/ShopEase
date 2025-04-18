import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import ShoppingCart from "./components/ShoppingCart";

// Sample product data - in a real application, this would come from an API
const sampleProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "Premium noise-cancelling wireless headphones with 30-hour battery life",
    price: 149.99,
    image: "/api/placeholder/400/400",
    discount: 15,
    rating: 4,
    stock: 23,
    isNew: true,
    category: "Electronics"
  },
  {
    id: 2,
    name: "Smart Watch",
    description: "Advanced fitness tracker with heart rate monitoring and sleep analysis",
    price: 199.99,
    image: "/api/placeholder/400/400",
    discount: 0,
    rating: 5,
    stock: 12,
    isNew: true,
    category: "Electronics"
  },
  {
    id: 3,
    name: "Premium Coffee Maker",
    description: "Programmable coffee machine with built-in grinder and milk frother",
    price: 129.99,
    image: "/api/placeholder/400/400",
    discount: 10,
    rating: 4,
    stock: 8,
    isNew: false,
    category: "Kitchen"
  },
  {
    id: 4,
    name: "Leather Wallet",
    description: "Handcrafted genuine leather wallet with RFID protection",
    price: 59.95,
    image: "/api/placeholder/400/400",
    discount: 0,
    rating: 5,
    stock: 32,
    isNew: false,
    category: "Accessories"
  },
  {
    id: 5,
    name: "Wireless Charging Pad",
    description: "Fast-charging wireless pad compatible with all Qi-enabled devices",
    price: 39.99,
    image: "/api/placeholder/400/400",
    discount: 20,
    rating: 3,
    stock: 5,
    isNew: false,
    category: "Electronics"
  },
  {
    id: 6,
    name: "Portable Bluetooth Speaker",
    description: "Waterproof portable speaker with 24-hour playtime and deep bass",
    price: 89.99,
    image: "/api/placeholder/400/400",
    discount: 0,
    rating: 4,
    stock: 17,
    isNew: true,
    category: "Electronics"
  },
  {
    id: 7,
    name: "Stainless Steel Water Bottle",
    description: "Vacuum insulated bottle that keeps drinks hot for 12 hours or cold for 24 hours",
    price: 34.95,
    image: "/api/placeholder/400/400",
    discount: 0,
    rating: 5,
    stock: 41,
    isNew: false,
    category: "Kitchen"
  },
  {
    id: 8,
    name: "Backpack",
    description: "Water-resistant backpack with laptop compartment and USB charging port",
    price: 79.99,
    image: "/api/placeholder/400/400",
    discount: 25,
    rating: 4,
    stock: 0,
    isNew: false,
    category: "Accessories"
  },
  {
    id: 9,
    name: "Smart Home Hub",
    description: "Central control system for connected home devices with voice assistant",
    price: 129.99,
    image: "/api/placeholder/400/400",
    discount: 0,
    rating: 4,
    stock: 7,
    isNew: true,
    category: "Electronics"
  }
];

function App() {
  const [products] = useState(sampleProducts);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

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
    
    // Show cart briefly when item is added
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
  
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header cartCount={cartItemCount} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Hero section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-8 mb-8">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Special Summer Sale</h1>
            <p className="text-blue-100 mb-6">Get up to 40% off on selected items. Limited time offer!</p>
            <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              Shop Now
            </button>
          </div>
        </div>
        
        {/* Category filter */}
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
        
        {/* Section title */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {activeCategory === "All" ? "Featured Products" : activeCategory}
          </h2>
          <div className="text-sm text-gray-500">
            Showing {filteredProducts.length} products
          </div>
        </div>
        
        {/* Product grid */}
        <ProductList products={filteredProducts} onAddToCart={addToCart} />
        
        {/* Shopping cart slide-in */}
        <ShoppingCart 
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cart}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
        />
        
        {/* Floating cart button (mobile) */}
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
      </main>
      
      <Footer />
    </div>
  );
}

export default App;