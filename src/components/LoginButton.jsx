// LoginButton.js
import React from 'react';
import { usePrivy } from '@privy-io/react-auth';
import ConnectButton from './ConnectButton';
import LogoutButton from './LogoutButton';
import './LoginButton.css';

const LoginButton = () => {
  const { authenticated } = usePrivy();

  return (
    <div className="top-right-buttons">
      {authenticated ? (
        <LogoutButton />
      ) : (
        <ConnectButton />
      )}
    </div>
  );
};

export default LoginButton;