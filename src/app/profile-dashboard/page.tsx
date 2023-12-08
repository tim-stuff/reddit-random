"use client";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from "wagmi";
import AddressDetails from "../address/[id]/page";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Renders a profile page
 *
 * @component
 * @returns A profile page with the user balance and details
 */
const Profile = () => {
  const { address, connector, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName });
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();
  const router = useRouter();

  useEffect(() => {
    if (!isConnected) router.push("/");
  }, [isConnected]);

  if (isConnected && connector) {
    return (
      <div>
        <img src={ensAvatar} alt="ENS Avatar" />
        <w3m-button />
        <div>{ensName ? `${ensName} (${address})` : address}</div>
        <div>Connected to {connector.name}</div>
        <button onClick={() => disconnect()}>Disconnect</button>
        <AddressDetails id={address} />
      </div>
    );
  }
};
export default Profile;
