"use client";

import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

/**
 * Renders a custom button with wagmi hooks to open network model
 * @returns A button to open the network model.
 */
const OpenNetworkModelBtn = () => {
  const { open } = useWeb3Modal();
  const { address, connector, isConnected } = useAccount();
  const router = useRouter();

  return (
    <>
      {isConnected ? (
        <button
          onClick={() => {
            router.push("/profile-dashboard");
          }}
          className="border-purple-400 text-black hover:bg-gray-100 shadow font-bold py-2 px-4 rounded w-fit"
        >
          Profile Dashboard
        </button>
      ) : (
        <button
          onClick={() => open({ view: "Networks" })}
          className="border-purple-400 text-black hover:bg-gray-100 shadow font-bold py-2 px-4 rounded w-fit"
        >
          Open Network Modals
        </button>
      )}
    </>
  );
};
export default OpenNetworkModelBtn;
