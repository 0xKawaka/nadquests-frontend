import { useWriteContract } from 'wagmi';
import { BADGES_ADDRESS } from './constants'; // Import contract address
import { BADGES_ABI } from './abis';


export const useMintBadge = () => {
  const { writeContract, isPending, isSuccess, error } = useWriteContract();

  const mintNFT = async (tokenType, key, signature) => {
    try {
      await writeContract({
        address: BADGES_ADDRESS,
        abi: BADGES_ABI,
        functionName: 'mintNFT',
        args: [tokenType, key, signature],
      });
    } catch (err) {
      console.error("Minting failed:", err);
    }
  };

  return { mintNFT, isPending, isSuccess, error };
};
