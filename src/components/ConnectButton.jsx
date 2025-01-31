import React from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const ConnectButtonWrapper = ({className}) => {
  const { login } = usePrivy();

  return (
    <ConnectButton className={className}></ConnectButton>
  );
};

export default ConnectButtonWrapper;