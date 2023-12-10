import axios from "axios";
import { formatUnixTime } from "../HelperFunctions/HelperFunctions";

type EtherPrice = {
  ethusd: number;
  updatedAt: string;
};

/**
 * Fetches the latest ether price
 * @returns  A Promise that resolves to the ether price and formatted time or null if an error occurs.
 */

export default async function getEtherLastPrice(): Promise<EtherPrice | null> {
  try {
    const response = await axios.get("https://api.etherscan.io/api", {
      params: {
        module: "stats",
        action: "ethprice",
        apikey: process.env.ETHERSCAN_API,
      },
    });

    if (response.data) {
      const { ethusd, ethusd_timestamp } = response.data.result;

      return {
        ethusd: parseFloat(Number(ethusd).toFixed(2)),
        updatedAt: formatUnixTime(ethusd_timestamp),
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
