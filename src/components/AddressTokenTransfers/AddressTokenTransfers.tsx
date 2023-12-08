import { TokenTransfer } from "@/types/sharedTypes";
import { getTokenTransfers } from "@/utils/services/getAddressDetails";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Props = {
  addressId: string;
  data: TokenTransfer[];
  pageNumber: number;

  setData: Dispatch<SetStateAction<TokenTransfer[]>>;
};

/**
 * Renders list of erc-20 token transactions
 *
 * @component
 * @param addressId - A string representing the given addressId
 * @param pageNumber - The current page number
 * @param data - An array of data to be rendered
 * @param setData -Function to update the state with new data
 * @returns A component for the list of erc-20 token transactions.
 */
const AddressTokenTransfers = ({
  addressId,
  data,
  setData,
  pageNumber,
}: Props) => {
  useEffect(() => {
    if (pageNumber < data.length / 20) {
      return;
    }
    async function getDetails() {
      const startBlock = data && data.length ? data.length : 0;
      const details = await getTokenTransfers(
        addressId,
        pageNumber,
        startBlock
      );
      if (details)
        setData((prev) => {
          return [...prev, ...details];
        });
    }
    getDetails();
  }, [pageNumber, addressId]);

  if (!data) return null;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-collapse text-sm">
        <thead>
          <tr>
            <th className="border p-2">Transaction Hash</th>
            <th className="border p-2">To</th>
            <th className="border p-2">Value</th>
            <th className="border p-2">Timestamp</th>
            <th className="border p-2">From</th>
            <th className="border p-2">Function Name</th>
          </tr>
        </thead>
        <tbody>
          {data
            .slice((pageNumber - 1) * 20, (pageNumber - 1) * 20 + 20)
            .map((transaction, index) => (
              <tr key={index}>
                <td className="border p-2">{transaction.hash}</td>
                <td className="border p-2">{transaction.to}</td>
                <td className="border p-2">{transaction.value}</td>
                <td className="border p-2">{transaction.timeStamp}</td>
                <td className="border p-2">{transaction.from}</td>
                <td className="border p-2">{transaction.method}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddressTokenTransfers;
