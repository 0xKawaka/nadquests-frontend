import { ConnectButton } from '@rainbow-me/rainbowkit';

const CustomConnectButton = ({className}) => (
  <ConnectButton />
  // <ConnectButton.Custom>
  //   {({ account, chain, openConnectModal, openAccountModal, openChainModal, mounted }) => {
  //     return (
  //       <div
  //         {...(!mounted && {
  //           'aria-hidden': true,
  //           style: { opacity: 0, pointerEvents: 'none', userSelect: 'none' }
  //         })}
  //       >
  //         {(() => {
  //           if (!mounted || !account || !chain) {
  //             return (
  //               <button
  //                 className="className"
  //                 onClick={openConnectModal}
  //               >
  //                 Connect Wallet
  //               </button>
  //             );
  //           }
  //           return (
  //             <button className="custom-connected-button" onClick={openAccountModal}>
  //               {account.displayName}
  //             </button>
  //           );
  //         })()}
  //       </div>
  //     );
  //   }}
  // </ConnectButton.Custom>
);

export default CustomConnectButton;