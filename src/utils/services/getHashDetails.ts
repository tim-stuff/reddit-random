"use server";

import { HashDetails } from "@/types/sharedTypes";
import axios from "axios";

/**
 *
 * @param id - The hash id
 * @returns  A Promise that resolves to hash status or null if an error occurs.
 */
export async function getHashDetials(id: string): Promise<HashDetails | null> {
  try {
    return {
      status: "1",
      error: "0",
      errorMessage: "",
    };
    const response = await axios.get("https://api.etherscan.io/api", {
      params: {
        module: "transaction",
        action: "getstatus",
        txhash: id,
        apikey: process.env.ETHERSCAN_API,
      },
    });

    if (response.data.status === "1") {
      const { status, result } = response.data;

      return {
        status: status,
        error: result.isError,
        errorMessage: result.errDescription,
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
