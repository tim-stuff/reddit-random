"use server";

import {
  AddressBalance,
  NormalTransaction,
  TokenTransfer,
} from "@/types/sharedTypes";
import axios from "axios";
import { getTimeAgo } from "../HelperFunctions/HelperFunctions";

/**
 * Retrieves the balance of an Ethereum address.
 *
 * @param id The Ethereum address for which to retrieve the balance.
 * @returns  A Promise that resolves to the balance in Wei or null if an error occurs.
 */
export async function getAddressBalance(
  id: string
): Promise<AddressBalance | null> {
  try {
    const response = await axios.get("https://api.etherscan.io/api", {
      params: {
        module: "account",
        action: "balance",
        address: id,
        tag: "latest",
        apikey: process.env.ETHERSCAN_API,
      },
    });

    if (response.data.status === "1") {
      const { status, result } = response.data;

      return result; //result is in wei
    } else {
      console.error("Error fetching data:", response.data.message);
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

/**
 * Retrieves a list of normal (Ether) transactions for a given Ethereum address.
 *
 * @param  id - The Ethereum address for which to retrieve transactions.
 * @param } page - The page number for paginated results.
 * @param startBlock - The starting block number for fetching transactions.
 * @returns  A Promise that resolves to an array of normal transactions or null if an error occurs.
 */
export async function getNormalTransactions(
  id: string,
  page: number,
  startBlock: number
): Promise<NormalTransaction[] | null> {
  try {
    const response = await axios.get("https://api.etherscan.io/api", {
      params: {
        module: "account",
        action: "txlist",
        address: id,
        startBlock: startBlock,
        endblock: 99999999,
        page: page,
        offset: 20,
        sort: "asc",
        apikey: process.env.ETHERSCAN_API,
      },
    });

    if (response.data.status === "1") {
      const { result } = response.data;
      console.log("🚀 ~ file: getAddressDetails.ts:74 ~ result:", result);
      const mappedResult = result.map((transaction: NormalTransaction) => ({
        hash: transaction.hash,
        to: transaction.to,
        value: transaction.value,
        timeStamp: getTimeAgo(transaction.timeStamp),
        from: transaction.from,
        method: transaction.functionName,
      }));

      return mappedResult;
    } else {
      console.error("Error fetching data:", response.data.message);
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

/**
 * Retrieves a list of token transfers for a given Ethereum address.
 *
 * @param  id - The Ethereum address for which to retrieve token transfers.
 * @param  page - The page number for paginated results.
 * @param  startBlock - The starting block number for fetching token transfers.
 * @returns  A Promise that resolves to an array of token transfers or null if an error occurs.
 */
export async function getTokenTransfers(
  id: string,
  page: number,
  startBlock: number
): Promise<TokenTransfer[] | null> {
  try {
    const response = await axios.get("https://api.etherscan.io/api", {
      params: {
        module: "account",
        action: "tokentx",
        address: id,
        startBlock: startBlock,
        endblock: 99999999,
        page: page,
        offset: 20,
        sort: "asc",
        apikey: process.env.ETHERSCAN_API,
      },
    });

    if (response.data.status === "1") {
      const { result } = response.data;
      const mappedResult = result.map((transaction: TokenTransfer) => ({
        hash: transaction.hash,
        to: transaction.to,
        value: transaction.value,
        timeStamp: getTimeAgo(transaction.timeStamp),
        from: transaction.from,
        functionName: transaction.method,
      }));

      return mappedResult;
    } else {
      console.error("Error fetching data:", response.data.message);
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
