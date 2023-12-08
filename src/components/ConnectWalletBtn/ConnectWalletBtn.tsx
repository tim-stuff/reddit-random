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

/**
 * Renders a custom button with wagmi hooks to connect/disconnect to wallets
 * @returns A connect or disconnect button depending on the connected state.
 */
const ConnectWalletBtn = () => {
  const { open } = useWeb3Modal();
  const { address, connector, isConnected } = useAccount();
  const router = useRouter();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    if (isConnected) router.push("/profile-dashboard");
  }, [isConnected]);

  return (
    <>
      {isConnected ? (
        <button onClick={() => disconnect()}>Disconnect</button>
      ) : (
        <button
          onClick={() => open()}
          className=" text-white border-purple-500  bg-purple-600 hover:bg-purple-700 shadow font-bold py-2 px-4 rounded w-fit"
        >
          Connect Wallet
        </button>
      )}
    </>
  );
};
export default ConnectWalletBtn;
