import { useState } from "react";

const useUserData = () => {
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

  return [userData, setUserData];
};

export default useUserData;