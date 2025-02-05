import { useWriteContract } from 'wagmi';
import { BADGES_ADDRESS } from './constants'; // Import contract address
// import { BADGES_ABI } from './abis';
import badgesABI from './badges.json'

const useMintBadge = () => {
  const { writeContract, isPending, isSuccess, error } = useWriteContract();

  const mintNFT = async (tokenType, key, twitterId, signature) => {
    try {
      await writeContract({
        address: BADGES_ADDRESS,
        abi: badgesABI,
        functionName: 'mintNFT',
        args: [tokenType, key, twitterId, signature],
      });
    } catch (err) {
      console.error("Minting failed:", err);
    }
  };

  return { mintNFT, isPending, isSuccess, error };
};

export { useMintBadge };
