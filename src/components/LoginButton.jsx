// LoginButton.js
import React, { useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import ConnectButton from './ConnectButton';
import LogoutButton from './LogoutButton';
import './LoginButton.css';

const LoginButton = () => {
  const { authenticated, user } = usePrivy();

  useEffect(() => {
    if (authenticated && user) {
      // Récupération de l'adresse du wallet
      const walletAddress = user.wallet?.address;
      
      if (walletAddress) {
        // Stockage dans le localStorage
        localStorage.setItem('walletAddress', walletAddress);
      }
    }
  }, [authenticated, user]); // Déclenché quand l'authentification ou l'utilisateur change

  return (
    <div className="top-right-buttons">
      {authenticated ? (
        <LogoutButton />
      ) : (
        <ConnectButton className={"connect-button"} />
      )}
    </div>
  );
};

export default LoginButton;