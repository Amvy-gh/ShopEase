import React, { useState } from 'react';

function UserProfile({ onClose, userData, onLogout }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userData?.name || 'Guest User',
    email: userData?.email || 'guest@example.com',
    phone: userData?.phone || '',
    address: userData?.address || '',
  });

  // Sample order history data
  const orderHistory = userData?.orders || [
    { id: 'ORD-001', date: '2025-04-15', status: 'Delivered', total: 125.99 },
    { id: 'ORD-002', date: '2025-03-22', status: 'Processing', total: 79.50 },
    { id: 'ORD-003', date: '2025-02-10', status: 'Delivered', total: 210.75 },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      {!isEditing ? (
        <>
          <div className="flex items-center space-x-4">
            <div className="bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold">
              {formData.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-xl font-semibold">{formData.name}</h3>
              <p className="text-gray-500">{formData.email}</p>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500">Email:</span>
              <span>{formData.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Phone:</span>
              <span>{formData.phone || 'Not set'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Address:</span>
              <span>{formData.address || 'Not set'}</span>
            </div>
          </div>

          <button 
            onClick={() => setIsEditing(true)}
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Edit Profile
          </button>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
          
          <div className="flex space-x-3">
            <button
              type="submit"
              className="flex-1 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="flex-1 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );

  const renderOrdersTab = () => (
    <div>
      <h3 className="text-xl font-semibold mb-4">Order History</h3>
      {orderHistory.length > 0 ? (
        <div className="space-y-4">
          {orderHistory.map((order) => (
            <div key={order.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{order.id}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  order.status === 'Delivered' 
                    ? 'bg-green-100 text-green-800' 
                    : order.status === 'Processing'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.status}
                </span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Order Date: {order.date}</span>
                <span className="font-medium">${order.total.toFixed(2)}</span>
              </div>
              <button 
                className="mt-2 text-blue-600 text-sm hover:underline"
                onClick={() => alert(`View details for order ${order.id}`)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>You haven't placed any orders yet.</p>
          <button className="mt-2 text-blue-600 hover:underline">
            Start Shopping
          </button>
        </div>
      )}
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Account Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium">Password</h4>
              <p className="text-sm text-gray-500">Change your account password</p>
            </div>
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              onClick={() => alert('Change password functionality not implemented yet')}
            >
              Change
            </button>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium">Notifications</h4>
              <p className="text-sm text-gray-500">Manage email notifications</p>
            </div>
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              onClick={() => alert('Notification settings not implemented yet')}
            >
              Configure
            </button>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium">Payment Methods</h4>
              <p className="text-sm text-gray-500">Add or remove payment methods</p>
            </div>
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              onClick={() => alert('Payment methods not implemented yet')}
            >
              Manage
            </button>
          </div>
        </div>
      </div>
      
      <div className="pt-4 border-t border-gray-200">
        <button 
          onClick={onLogout}
          className="w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Log Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end overflow-hidden">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto shadow-xl p-6 transition-all duration-300 transform">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">My Account</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'profile' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'orders' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('orders')}
          >
            Orders
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'settings' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </div>
        
        {activeTab === 'profile' && renderProfileTab()}
        {activeTab === 'orders' && renderOrdersTab()}
        {activeTab === 'settings' && renderSettingsTab()}
      </div>
    </div>
  );
}

export default UserProfile;