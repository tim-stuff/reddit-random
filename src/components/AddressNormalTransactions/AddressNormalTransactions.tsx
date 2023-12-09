import { Transaction } from "@/types/sharedTypes";
import { getNormalTransactions } from "@/utils/services/getAddressDetails";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import TransactionTable from "../TransactionTable/TansactionTable";

type Props = {
  addressId: string;
  pageNumber: number;
  data: Transaction[];
  setData: Dispatch<SetStateAction<Transaction[]>>;
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

  return <TransactionTable data={data} pageNumber={pageNumber} />;
};

export default AddressNormalTransaction;
