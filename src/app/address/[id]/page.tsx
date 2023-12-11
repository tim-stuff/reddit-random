"use client";

import { AddressBalance } from "@/types/sharedTypes";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import CopyBtn from "@/components/CopyBtn/CopyBtn";
import AddressDetails from "@/components/AddressDetails/AddressDetails";
import { getAddressBalance } from "@/utils/services/getAddressDetails";

/**
 * Renders the address details including address balance, token transfers, and normal transactions.
 * @component
 * @returns A component representing the address details
 */
const AddressPage = () => {
  const params = useParams();
  const [addressBalance, setAddressBalance] = useState<AddressBalance | null>(
    null
  );
  const addressId = typeof params.id === "string" ? params.id : params.id[0];

  useEffect(() => {
    async function getDetails() {
      const details = await getAddressBalance(addressId);
      if (details) setAddressBalance(details);
    }
    getDetails();
  }, [addressId]);

  return (
    <>
      <div className="p-4 border rounded-md shadow-md w-fit pb-8">
        <h2 className="text-lg font-semibold mb-2 ">Address Details</h2>

        <div className="flex gap-4 ">
          <p className=" whitespace-normal break-all ">
            {` Address : ${addressId} `}
          </p>
          <CopyBtn hashId={addressId} />
        </div>
        {addressBalance && (
          <div>{` Current address balance : ${addressBalance} wei`}</div>
        )}
      </div>
      <AddressDetails addressId={addressId} />
    </>
  );
};

export default AddressPage;
