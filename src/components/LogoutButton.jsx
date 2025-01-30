// LogoutButton.js
import React from 'react';
import { usePrivy } from '@privy-io/react-auth';

const LogoutButton = () => {
  const { logout } = usePrivy();

  const handleLogout = () => {
    logout();
    // Suppression du wallet du localStorage
    localStorage.removeItem('walletAddress');
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;