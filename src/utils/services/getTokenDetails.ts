"use server";

import { TokenDetails } from "@/types/sharedTypes";
import axios from "axios";

/**
 *
 * @param id - The token id
 * @returns  A Promise that resolves to token details or null if an error occurs.
 */
export async function getTokenDetails(
  id: string
): Promise<TokenDetails | null> {
  try {
    const response = await axios.get("https://api.etherscan.io/api", {
      params: {
        module: "stats",
        action: "tokensupply",
        contractaddress: id,
        apikey: process.env.ETHERSCAN_API,
      },
    });

    if (response.data) {
      const { status, result, message } = response.data;

      return {
        status: status,
        result: result,
        message: message,
      };
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
 *
 * @param id - The token id
 * @param address - The address to look up for the token
 * @returns  A Promise that resolves to token details or null if an error occurs.
 */
export async function getTokenBalanceForAccount(
  id: string,
  address: string
): Promise<TokenDetails | null> {
  try {
    const response = await axios.get("https://api.etherscan.io/api", {
      params: {
        module: "account",
        action: "tokenbalance",
        contractaddress: address,
        address: id,
        apikey: process.env.ETHERSCAN_API,
      },
    });

    if (response.data) {
      const { status, result, message } = response.data;

      return {
        status: status,
        result: result,
        message: message,
      };
    } else {
      console.error("Error fetching data:", response.data.message);
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
