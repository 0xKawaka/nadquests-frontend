import axios from 'axios';
import { API_URL } from '../config';

const getClaimSignature = async (walletAdrs, tokenType) => {
  try {
    const response = await axios.get(`${API_URL}/crypto/getClaimSignature/${walletAdrs}/${tokenType}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching claim signature:', error.response?.data || error.message);
    throw error;
  }
};

export {getClaimSignature};
