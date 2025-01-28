import React from 'react';
import { usePrivy } from '@privy-io/react-auth';

const ConnectButton = ({className}) => {
  const { login } = usePrivy();

  return (
    <button className={className} onClick={login}>
      Connect
    </button>
  );
};

export default ConnectButton;