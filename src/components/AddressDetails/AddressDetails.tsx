import { getAddressBalance } from "@/utils/services/getAddressDetails";
import { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";
import AddressNormalTransaction from "../AddressNormalTransactions/AddressNormalTransactions";
import AddressTokenTransfers from "../AddressTokenTransfers/AddressTokenTransfers";

type Props = {
  addressId: string;
};

/**
 * Renders the components for address details as token transfers, and normal transactions.
 * @component
 * @param addressId - The address id for which to fetch the data
 * @returns A component representing the address details
 */
const AddressDetails = ({ addressId }: Props) => {
  const [index, setIndex] = useState(0);

  return (
    <>
      <div>
        <div className="flex border-b py-4 text-blue-500">
          <button
            onClick={() => setIndex(0)}
            className={`bg-white inline-blockrounded-t py-2 px-4  font-semibold ${
              index === 0 && " border-t border-r border-l text-blue-700 "
            } `}
          >
            Normal Transactions
          </button>
          <button
            onClick={() => setIndex(1)}
            className={`bg-white inline-blockrounded-t py-2 px-4  font-semibold ${
              index !== 0 && " border-t border-r border-l text-blue-700"
            } `}
          >
            Token Transfers
          </button>
        </div>
        {index === 0 ? (
          <Pagination key="normal" addressId={addressId}>
            {AddressNormalTransaction}
          </Pagination>
        ) : (
          <Pagination key="token" addressId={addressId}>
            {AddressTokenTransfers}
          </Pagination>
        )}
      </div>
    </>
  );
};

export default AddressDetails;
