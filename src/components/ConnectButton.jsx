import React from 'react';
import { usePrivy } from '@privy-io/react-auth';

const ConnectButton = () => {
  const { login } = usePrivy();

  return (
    <button className="connect-button" onClick={login}>
      Connect
    </button>
  );
};

export default ConnectButton;