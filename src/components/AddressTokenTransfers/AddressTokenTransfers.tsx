import { Transaction } from "@/types/sharedTypes";
import { getTokenTransfers } from "@/utils/services/getAddressDetails";
import Link from "next/link";
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

  async function getDetails() {
    const startBlock = data && data.length ? data.length : 0;
    const details = await getTokenTransfers(addressId, pageNumber, startBlock);
    if (details)
      setData((prev) => {
        return [...prev, ...details];
      });
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

  return <TransactionTable data={data} pageNumber={pageNumber} />;
};

export default AddressTokenTransfers;
