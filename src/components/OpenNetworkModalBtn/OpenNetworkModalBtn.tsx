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
 * Renders a custom button with wagmi hooks to open network model
 * @returns A button to open the network model.
 */
const OpenNetworkModelBtn = () => {
  const { open } = useWeb3Modal();
  const { address, connector, isConnected } = useAccount();
  const router = useRouter();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    if (isConnected) router.push("/profile-dashboard");
  }, [isConnected]);

  return (
    <button
      onClick={() => open({ view: "Networks" })}
      className="border-purple-400 hover:bg-gray-100 shadow font-bold py-2 px-4 rounded"
    >
      Open Network Modals
    </button>
  );
};
export default OpenNetworkModelBtn;
