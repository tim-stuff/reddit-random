"use client";

import AddressNormalTransaction from "@/components/AddressNormalTransactions/AddressNormalTransactions";
import AddressTokenTransfers from "@/components/AddressTokenTransfers/AddressTokenTransfers";
import Pagination from "@/components/Pagination/Pagination";
import { AddressBalance } from "@/types/sharedTypes";
import { getAddressBalance } from "@/utils/services/getAddressDetails";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { NormalTransaction, TokenTransfer } from "@/types/sharedTypes";

/**
 * Renders the address details including address balance, token transfers, and normal transactions.
 * @component
 * @returns A component representing the address details
 */
const AddressDetails = ({ id }: { id?: string }) => {
  const [data, setData] = useState<NormalTransaction[] | TokenTransfer[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const params = useParams();
  const [addressBalance, setAddressBalance] = useState<AddressBalance | null>(
    null
  );
  const [index, setIndex] = useState(0);
  const addressId = id
    ? id
    : typeof params.id === "string"
    ? params.id
    : params.id[0];

  useEffect(() => {
    async function getDetails() {
      const details = await getAddressBalance(addressId);
      if (details) setAddressBalance(details);
    }
    getDetails();
  }, []);

  return (
    <>
      <div className="p-4 border rounded-md shadow-md">
        <h2 className="text-lg font-semibold mb-2">Address Details</h2>

        <p>
          {` Address : ${addressId} wei`}
          <span
            className=" cursor-pointer text-xs border-purple-200 border p-2 "
            onClick={() => {
              navigator.clipboard.writeText(addressId);
            }}
          ></span>
        </p>
        {addressBalance && (
          <div>{` Current address balance : ${addressBalance} wei`}</div>
        )}
      </div>
      <div>
        <div className="flex gap-5">
          <button onClick={() => setIndex(0)}>Token Transfers</button>
          <button onClick={() => setIndex(1)}>Normal Transactions</button>
        </div>
        {index === 0 ? (
          <Pagination addressId={addressId}>{AddressTokenTransfers}</Pagination>
        ) : (
          <Pagination addressId={addressId}>
            {AddressNormalTransaction}
          </Pagination>
        )}
      </div>
    </>
  );
};

export default AddressDetails;
