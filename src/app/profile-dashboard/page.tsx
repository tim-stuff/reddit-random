"use client";
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Avatar from "@/components/Avatar/Avatar";
import AddressDetails from "@/components/AddressDetails/AddressDetails";

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

  const { disconnect } = useDisconnect();
  const router = useRouter();

  useEffect(() => {
    if (!isConnected) router.push("/");
  }, [isConnected, router]);

  if (isConnected && connector) {
    return (
      <div className="flex flex-col p-6 pt-2 mb-4">
        <div className="border shadow-xl w-fit p-4 mb-4">
          <div className="flex flex-col gap-4 mb-4">
            <Avatar src={ensAvatar} name={ensName} />
            <w3m-button />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 align-middle ">
              <span className="font-semibold text-md">Account Address: </span>
              <span className="whitespace-normal break-all">{address}</span>
            </div>
          </div>
          <div className="flex w-full max-w-xl justify-end">
            <button
              onClick={() => disconnect()}
              className="m-4 border border-purple-400 hover:bg-gray-100 shadow font-bold py-2 px-4 rounded w-fit"
            >
              Disconnect
            </button>
          </div>
        </div>
        <div className="font-semibold text-md border-t-2 border-b-2 text-center p-4 my-4">
          Connected to {connector.name}
        </div>
        {address && <AddressDetails addressId={address} />}
      </div>
    );
  }
};
export default Profile;
