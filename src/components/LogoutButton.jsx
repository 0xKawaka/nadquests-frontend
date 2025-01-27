import React from 'react';
import { usePrivy } from '@privy-io/react-auth';

const LogoutButton = () => {
  const { logout } = usePrivy();

  return (
    <button className="logout-button" onClick={logout}>
      Logout
    </button>
  );
};

export default LogoutButton;