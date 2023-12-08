import { NormalTransaction } from "@/types/sharedTypes";
import { getNormalTransactions } from "@/utils/services/getAddressDetails";
import { useEffect, useState } from "react";

type Props = {
  addressId: string;
};

/**
 * Renders list of normal transactions
 * @component
 * @param addressId - A string representing the given addressId
 * @returns A component for the list of normal transactions.
 */
const AddressNormalTransaction = ({ addressId }: Props) => {
  const [normalTransaction, setNormalTransactions] = useState<
    NormalTransaction[]
  >([]);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    if (pageNumber < normalTransaction.length / 20) {
      return;
    }
    async function getDetails() {
      const startBlock =
        normalTransaction && normalTransaction.length
          ? normalTransaction.length
          : 0;
      const details = await getNormalTransactions(
        addressId,
        pageNumber,
        startBlock
      );
      if (details) setNormalTransactions((prev) => [...prev, ...details]);
    }
    getDetails();
  }, [pageNumber, addressId]);

  if (!normalTransaction) return null;

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
          {normalTransaction
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
      <div className="flex gap-4 m-10">
        <p>{`Current Page ${pageNumber}`}</p>
        <button
          className="border border-purple-500 text-purple-500 px-4 py-2 rounded focus:outline-none"
          onClick={() => setPageNumber((prev) => prev - 1)}
          disabled={pageNumber === 1}
        >
          Previous
        </button>
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded focus:outline-none"
          onClick={() => setPageNumber((prev) => prev + 1)}
          disabled={
            normalTransaction.slice(
              (pageNumber - 1) * 20,
              (pageNumber - 1) * 20 + 20
            ).length < 20
              ? true
              : false
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AddressNormalTransaction;
