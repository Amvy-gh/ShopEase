import React from 'react';

const OrderComplete = ({ orderData, onBack }) => (
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
          onClick={onBack}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
  
export default OrderComplete;