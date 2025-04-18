import React from 'react';

function ShoppingCart({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }) {
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.discount ? 
      (item.price - (item.price * item.discount / 100)) * item.quantity : 
      item.price * item.quantity), 
    0
  ).toFixed(2);

  return (
    <div className={`fixed inset-y-0 right-0 max-w-sm w-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
      isOpen ? 'translate-x-0' : 'translate-x-full'
    }`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="px-4 py-3 border-b flex items-center justify-between">
          <h3 className="text-lg font-medium">Your Cart ({cartItems.length})</h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Cart items */}
        <div className="flex-grow overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="text-gray-500">Your cart is empty</p>
              <button 
                onClick={onClose}
                className="mt-4 text-blue-600 hover:underline"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="divide-y">
              {cartItems.map(item => {
                const discountedPrice = item.discount ? 
                  (item.price - (item.price * item.discount / 100)).toFixed(2) : 
                  item.price;
                
                return (
                  <li key={item.id} className="py-4 flex">
                    <div className="w-20 h-20 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="ml-4 flex-grow">
                      <div className="flex justify-between">
                        <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                        <button 
                          onClick={() => onRemoveItem(item.id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      
                      <p className="text-sm text-gray-500 mt-1 line-clamp-1">{item.description}</p>
                      
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex border rounded">
                          <button 
                            className="px-2 py-1 border-r"
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          >
                            -
                          </button>
                          <span className="px-3 py-1">{item.quantity}</span>
                          <button 
                            className="px-2 py-1 border-l"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">
                            ${(discountedPrice * item.quantity).toFixed(2)}
                          </div>
                          {item.discount > 0 && (
                            <div className="text-xs text-gray-500 line-through">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        
        {/* Footer with total and checkout */}
        <div className="border-t p-4">
          <div className="flex justify-between mb-3">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">${totalPrice}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium">Calculated at checkout</span>
          </div>
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Proceed to Checkout
          </button>
          <button 
            onClick={onClose}
            className="w-full text-center mt-3 text-blue-600 hover:underline"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;