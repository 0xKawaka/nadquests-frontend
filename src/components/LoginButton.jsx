import React, { useEffect } from 'react';
import { useAccount } from 'wagmi';
import CustomConnectButton from './CustomConnectButton';
import './LoginButton.css';
import { sendWalletAddress } from '../api/post';

const LoginButton = () => {
  const { address, isConnected } = useAccount();

  useEffect(() => {
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
      <CustomConnectButton />
    </div>
  );
};

export default LoginButton;
