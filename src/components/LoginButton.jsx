import React, { useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import axios from 'axios';
import ConnectButton from './ConnectButton';
import LogoutButton from './LogoutButton';
import './LoginButton.css';

const LoginButton = () => {
  const { authenticated, user } = usePrivy();

  useEffect(() => {
    const sendWalletAddress = async (walletAddress) => {
      try {
        const response = await axios.post('http://localhost:3000/api/users', {
          walletAddress,
        });

        console.log('Wallet address envoyé avec succès:', response.data);
      } catch (error) {
        console.error('Erreur lors de l’envoi du walletAddress:', error);
      }
    };

    if (authenticated) {
      let walletAddress = localStorage.getItem('walletAddress');

      // Si non trouvé dans le localStorage, on le récupère de l'utilisateur
      if (!walletAddress && user?.wallet?.address) {
        walletAddress = user.wallet.address;
        localStorage.setItem('walletAddress', walletAddress);
      }

      // Envoie l'adresse si elle existe
      if (walletAddress) {
        sendWalletAddress(walletAddress);
      }
    }
  }, [authenticated, user]);

  return (
    <div className="top-right-buttons">
      {authenticated ? <LogoutButton /> : <ConnectButton className="connect-button" />}
    </div>
  );
};

export default LoginButton;
