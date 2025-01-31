import React, { useEffect } from 'react';
import { useAccount } from 'wagmi';
import axios from 'axios';
import ConnectButtonWrapper from './ConnectButton';
import LogoutButton from './LogoutButton';
import './LoginButton.css';

const LoginButton = () => {
  const { address, isConnected } = useAccount();

  useEffect(() => {
    const sendWalletAddress = async (walletAddress) => {
      try {
        const response = await axios.post('http://localhost:3000/api/users', {
          walletAddress,
        });
        console.log('Wallet address sent successfully:', response.data);
      } catch (error) {
        console.error('Error sending wallet address:', error);
      }
    };

    if (isConnected && address) {
      let storedWalletAddress = localStorage.getItem('walletAddress');

      if (!storedWalletAddress) {
        localStorage.setItem('walletAddress', address);
        sendWalletAddress(address);
      }
    }
  }, [isConnected, address]);

  return (
    <div className="top-right-buttons">
      {isConnected ? <LogoutButton /> : <ConnectButtonWrapper />}
    </div>
  );
};

export default LoginButton;
