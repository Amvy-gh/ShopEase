import React from 'react';

function Header({ cartCount, onCartClick, onProfileClick, searchQuery, onSearchChange, isLoggedIn, userName }) {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleCartClick = () => {
    if (onCartClick) {
      onCartClick();
    }
  };

  const handleUserClick = () => {
    if (onProfileClick) {
      onProfileClick();
    }
  };

  const handleSearchInput = (e) => {
    if (onSearchChange) {
      onSearchChange(e.target.value);
    }
  };

  const clearSearch = () => {
    if (onSearchChange) {
      onSearchChange("");
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer">
            <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 100-6 3 3 0 000 6zM17 6a3 3 0 100-6 3 3 0 000 6zM12.9 8.7l-1.5 4.8h2.2c.3 0 .5.2.4.5l-.7 3.5c-.1.3-.4.5-.7.5H7.5c-.3 0-.5-.2-.4-.5l1.8-8.8c.1-.3.4-.5.7-.5h2.9c.3 0 .5.2.4.5z" />
            </svg>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">ShopEase</span>
          </div>

          {/* Search */}
          <div className="hidden md:block flex-grow max-w-md mx-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-10 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={handleSearchInput}
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              {searchQuery && (
                <button 
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  onClick={clearSearch}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Navigation and Cart */}
          <div className="flex items-center space-x-4">
            <nav className="hidden md:block">
              <ul className="flex space-x-6">
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Home</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Categories</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Deals</a></li>
              </ul>
            </nav>

            <div className="flex items-center space-x-3">
              {/* Profile Button */}
              <button
                className="text-gray-600 hover:text-blue-600 transition-colors group relative"
                onClick={handleUserClick}
              >
                {isLoggedIn ? (
                  <div className="relative">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">
                      {userName?.charAt(0).toUpperCase() || 'G'}
                    </div>
                    <span className="hidden group-hover:block absolute -bottom-6 -left-8 w-24 text-xs bg-gray-800 text-white py-1 px-2 rounded text-center">
                      My Profile
                    </span>
                  </div>
                ) : (
                  <div className="relative">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="hidden group-hover:block absolute -bottom-6 -left-8 w-24 text-xs bg-gray-800 text-white py-1 px-2 rounded text-center">
                      Sign In
                    </span>
                  </div>
                )}
              </button>

              {/* Cart Button */}
              <button
                className="text-gray-600 hover:text-blue-600 transition-colors relative group"
                onClick={handleCartClick}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M17 13a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
