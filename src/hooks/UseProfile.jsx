import { useState } from "react";

const defaultUser = {
  name: "Guest User",
  email: "",
  phone: "",
  address: "",
  isLoggedIn: false,
  orders: []
};

export default function useUserProfile(initialUser = defaultUser) {
  const [userData, setUserData] = useState(initialUser);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleProfile = () => {
    setIsProfileOpen(prev => !prev);
  };

  const closeProfile = () => {
    setIsProfileOpen(false);
  };

  const updateUserData = (newData) => {
    setUserData(prev => ({ ...prev, ...newData }));
  };

  const handleLogout = () => {
    setUserData(defaultUser);
    closeProfile();
  };

  return {
    userData,
    setUserData,
    isProfileOpen,
    toggleProfile,
    closeProfile,
    updateUserData,
    handleLogout
  };
}
