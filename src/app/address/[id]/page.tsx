"use client";

import AddressNormalTransaction from "@/components/AddressNormalTransactions/AddressNormalTransactions";
import AddressTokenTransfers from "@/components/AddressTokenTransfers/AddressTokenTransfers";
import Pagination from "@/components/Pagination/Pagination";
import { AddressBalance } from "@/types/sharedTypes";
import { getAddressBalance } from "@/utils/services/getAddressDetails";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { NormalTransaction, TokenTransfer } from "@/types/sharedTypes";
import CopyBtn from "@/components/CopyBtn/CopyBtn";

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
      <div className="p-4 border rounded-md shadow-md w-fit">
        <h2 className="text-lg font-semibold mb-2 ">Address Details</h2>

        <div className="flex gap-4 ">
          <p className=" whitespace-normal break-all ">
            {` Address : ${addressId} wei `}
          </p>
          <CopyBtn hashId={addressId} />
        </div>
        {addressBalance && (
          <div>{` Current address balance : ${addressBalance} wei`}</div>
        )}
      </div>
      <div>
        <div className="flex border-b py-4">
          <button
            onClick={() => setIndex(0)}
            className={`bg-white inline-blockrounded-t py-2 px-4 text-blue-700 font-semibold ${
              index === 0 && " border-t border-r border-l"
            }`}
          >
            Normal Transactions
          </button>
          <button
            onClick={() => setIndex(1)}
            className={`bg-white inline-blockrounded-t py-2 px-4 text-blue-700 font-semibold ${
              index !== 0 && " border-t border-r border-l"
            }`}
          >
            Token Transfers
          </button>
        </div>
        {index === 0 ? (
          <Pagination addressId={addressId}>
            {AddressNormalTransaction}
          </Pagination>
        ) : (
          <Pagination addressId={addressId}>{AddressTokenTransfers}</Pagination>
        )}
      </div>
    </>
  );
};

export default AddressDetails;
