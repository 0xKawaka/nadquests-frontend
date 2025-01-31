import React from 'react';
import { useDisconnect } from 'wagmi';

const LogoutButton = () => {
  const { disconnect } = useDisconnect();

  const handleLogout = () => {
    disconnect();
    localStorage.removeItem('walletAddress');
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
