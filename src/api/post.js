import axios from 'axios';
import { API_URL } from '../config';

const sendWalletAddress = async (walletAddress) => {
  try {
    const response = await axios.post(API_URL + '/api/users', {
      walletAddress,
    });
    console.log('Wallet address sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending wallet address:', error);
  }
};

export {sendWalletAddress};