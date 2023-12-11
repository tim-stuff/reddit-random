import { Transaction } from "@/types/sharedTypes";
import { getTokenTransfers } from "@/utils/services/getAddressDetails";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import TransactionTable from "../TransactionTable/TansactionTable";

type Props = {
  addressId: string;
  data: Transaction[];
  pageNumber: number;
  setData: Dispatch<SetStateAction<Transaction[]>>;
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
  const firstRender = useRef(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getDetails() {
      const startBlock = data && data.length ? data.length : 0;
      const details = await getTokenTransfers(
        addressId,
        pageNumber,
        startBlock
      );
      setLoading(false);
      if (details)
        setData((prev) => {
          return [...prev, ...details];
        });
    }
    if (firstRender.current) {
      firstRender.current = false;
      getDetails();
    } else if (data.length && pageNumber > data.length / 20) {
      setLoading(true);
      getDetails();
    }
  }, [pageNumber, addressId, data, setData]);

  if (loading)
    return (
      <div className="text-center w-full text-blue-700  p-4 text-md">
        Fetching...
      </div>
    );
  if (data.length === 0)
    return (
      <div className="text-center w-full text-red-400  p-4 text-md">
        No data found
      </div>
    );

  return <TransactionTable data={data} pageNumber={pageNumber} />;
};

export default AddressTokenTransfers;
