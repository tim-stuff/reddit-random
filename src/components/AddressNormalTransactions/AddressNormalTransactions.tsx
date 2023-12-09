import { NormalTransaction, TokenTransfer } from "@/types/sharedTypes";
import { getNormalTransactions } from "@/utils/services/getAddressDetails";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

type Props = {
  addressId: string;
  pageNumber: number;
  data: NormalTransaction[];
  setData: Dispatch<SetStateAction<NormalTransaction[]>>;
};

/**
 * Renders list of normal transactions
 *
 * @component
 * @param addressId - A string representing the given addressId
 * @param pageNumber - The current page number
 * @param data - An array of data to be rendered
 * @param setData -Function to update the state with new data
 * @returns A component for the list of normal transactions.
 */
const AddressNormalTransaction = ({
  addressId,
  data,
  setData,
  pageNumber,
}: Props) => {
  const firstRender = useRef(true);

  async function getDetails() {
    const startBlock = data && data.length ? data.length : 0;

    const details = await getNormalTransactions(
      addressId,
      pageNumber,
      startBlock
    );

    if (details) setData((prev) => [...prev, ...details]);
  }

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      getDetails();
    } else if (data.length && pageNumber > data.length / 20) {
      getDetails();
    }
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
                <td className="border p-2">{transaction.functionName}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddressNormalTransaction;
