import React from 'react';
import { useMintBadge } from '../onchain/useMintBadge';

const MintBadgeButton = ({ tokenType }) => {
  const { mintNFT, isPending, isSuccess, error } = useMintBadge();
  const key = '0x1232';
  const signature = '0x456';

  return (
    <div>
      <button className='mint-badge-button' onClick={() => mintNFT(tokenType, key, signature)} disabled={isPending}>
        {isPending ? "Claiming..." : "Claim"}
      </button>
      {isSuccess && <p>Transaction successful!</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default MintBadgeButton;
