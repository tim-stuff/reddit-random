import axios from "axios";

type EtherPrice = {
  ethusd: number;
  updatedAt: string;
};

/**
 * Fetches the latest ether price
 * @returns The ether price in usd and formatted time.
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

    if (response.data.status === "1") {
      const { ethusd, ethusd_timestamp } = response.data.result;

      return {
        ethusd: parseFloat(Number(ethusd).toFixed(2)),
        updatedAt: ethusd_timestamp,
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
