import React from 'react';
import { useMintBadge } from '../onchain/useMintBadge';
import { getClaimSignature } from '../api/get';
import { useAccount } from 'wagmi';

const MintBadgeButton = ({ tokenType }) => {
  const { address, isConnected } = useAccount();
  const { mintNFT, isPending, isSuccess, error } = useMintBadge();

  async function handleMintNFTClic(tokenType) {
    let resp = await getClaimSignature(address, tokenType);
    console.log(resp);
    // await mintNFT(tokenType, key, signature);
  }

  return (
    <div>
      <button className='mint-badge-button' onClick={() => handleMintNFTClic(tokenType)} disabled={isPending}>
        {isPending ? "Claiming..." : "Claim"}
      </button>
      {isSuccess && <p>Transaction successful!</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default MintBadgeButton;
