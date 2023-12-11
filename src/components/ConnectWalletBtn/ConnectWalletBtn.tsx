"use client";

import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from "wagmi";

type Props = {
  className?: string;
};

/**
 * Renders a custom button with wagmi hooks to connect/disconnect to wallets
 * @returns A connect or disconnect button depending on the connected state.
 */
const ConnectWalletBtn = ({ className }: Props) => {
  const { open } = useWeb3Modal();
  const { address, connector, isConnected } = useAccount();
  const router = useRouter();
  const { disconnect } = useDisconnect();

  return (
    <>
      {isConnected ? (
        <button className={` ${className}`} onClick={() => disconnect()}>
          Disconnect
        </button>
      ) : (
        <button onClick={() => open()} className={` ${className}`}>
          Connect Wallet
        </button>
      )}
    </>
  );
};
export default ConnectWalletBtn;
